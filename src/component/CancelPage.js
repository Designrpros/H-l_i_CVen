import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div>
      <h2>Transaction Cancelled</h2>
      <p>Your checkout process was not completed.</p>
      <Link to="/cart">Return to Cart</Link> or <Link to="/products">Browse Products</Link>
    </div>
  );
};

export default CancelPage;
