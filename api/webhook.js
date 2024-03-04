const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Assuming you've initialized Firebase Admin SDK correctly somewhere globally or within this file
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        // Return a method not allowed response
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

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Perform operations based on the checkout session completion
        // For example, saving the order to Firestore
        const orderRef = db.collection('orders').doc(session.id);
        await orderRef.set({
            customerEmail: session.customer_details.email,
            status: 'completed',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            // Add other order details you need
        });

        console.log(`Order ${session.id} saved to Firestore.`);
    } else {
        console.warn(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
};
