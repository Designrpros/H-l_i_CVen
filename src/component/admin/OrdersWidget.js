import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Adjust import path as necessary
import { collection, onSnapshot } from 'firebase/firestore';

const OrdersWidget = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const newOrders = snapshot.docs.map(doc => doc.data());
      setOrders(newOrders);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <div>
      <h4>Total Revenue: ${totalRevenue.toFixed(2)}</h4>
      {/* Further UI elements to display orders data */}
    </div>
  );
};

export default OrdersWidget;
