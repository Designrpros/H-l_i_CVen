// src/stripe/stripeClient.js
import { loadStripe } from '@stripe/stripe-js';

// Replace 'your_publishable_key_here' with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51OqcVwEgnq0Uye647dnxsyCZoDBCxM675i0lhda17bQBUx2L9Pb2qBQGn75sf6CDy8baQe51hhBMHDilHqZ2CGDm00UroHgUCj');

export default stripePromise;
