const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const { cartItems, shippingDetails } = req.body;

    const lineItems = cartItems.map(item => {
        const priceMatch = item.price.match(/(\d+([.,]\d+)?)/);
        let priceInCents = 0;
        if (priceMatch) {
            const priceAsNumber = parseFloat(priceMatch[0].replace(',', '.'));
            priceInCents = Math.round(priceAsNumber * 100);
        }

        return {
            price_data: {
                currency: 'nok',
                product_data: {
                    name: item.name,
                },
                unit_amount: priceInCents,
            },
            quantity: item.quantity,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
            shipping_address_collection: {
                allowed_countries: ['NO'],
            },
            metadata: {
                customerEmail: shippingDetails.email,
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ error: error.message });
    }
};
