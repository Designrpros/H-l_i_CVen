const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    // Convert the private key from a string with escaped newlines into one that has actual newline characters
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
}

const db = admin.firestore();

module.exports = async (req, res) => {
    console.log("Received webhook request:", req.method, req.url);

    if (req.method !== 'POST') {
        console.error("Method not allowed:", req.method);
        return res.status(405).end('Method Not Allowed');
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        console.log("Checkout session completed:", session.id);

        try {
            const orderRef = db.collection('orders').doc(session.id);
            await orderRef.set({
                customerEmail: session.customer_details.email,
                status: 'completed',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                // Add other order details you need
            });

            console.log(`Order ${session.id} saved to Firestore.`);
        } catch (error) {
            console.error("Error saving order to Firestore:", error.message);
        }
    } else {
        console.warn(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};
