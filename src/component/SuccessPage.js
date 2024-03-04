import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const session_id = new URLSearchParams(location.search).get('session_id');

  // You can use session_id to fetch order details if needed

  return (
    <div>
      <h2>Thank You for Your Order!</h2>
      <p>Your transaction was successful.</p>
      {/* Display order details here */}
      <p>Order ID: {session_id}</p>
    </div>
  );
};

export default SuccessPage;
