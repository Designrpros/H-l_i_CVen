import Stripe from 'stripe';

// Replace with your actual Stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log("Received request:", req.method, req.url);

  // Set appropriate CORS headers for your production environment
  res.setHeader('Access-Control-Allow-Origin', 'https://h-l-i-c-ven.vercel.app'); // Replace with your domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS method for preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.error("Method not allowed:", req.method); // Log error for non-POST requests
    return res.status(405).end('Method Not Allowed');
  }

  try {
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

    console.log("Stripe checkout session created:", session.id); // Log checkout session creation
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error); // Log error message
    res.status(500).json({ error: 'An error occurred. Please try again later.' }); // Or provide a more specific error message if possible
  }
};
