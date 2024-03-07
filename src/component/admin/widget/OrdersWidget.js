import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const OrdersWidget = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Adjust the query to include orderBy
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert timestamp to JavaScript Date object if necessary
        createdAt: doc.data().createdAt?.toDate().toString(),
      }));
      console.log(newOrders); // Log fetched data
      setOrders(newOrders);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <div>
      <h4>Total Revenue: ${totalRevenue.toFixed(2)}</h4>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Email: {order.email}</p>
            <p>Total Amount: ${order.totalAmount / 100}</p> {/* Assuming totalAmount is in cents */}
            <p>Order Date: {order.createdAt}</p>
            <p>Products:</p>
            <ul>
              {order.productsPurchased.map((product, index) => (
                <li key={index}>
                  {product.name} - Quantity: {product.quantity} - Unit Price: ${product.unitPrice / 100}
                </li>
              ))}
            </ul>
            {order.shippingDetails && (
              <p>Shipping Address: {Object.values(order.shippingDetails.address).join(', ')}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersWidget;
