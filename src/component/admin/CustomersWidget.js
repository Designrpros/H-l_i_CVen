import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

const CustomersWidget = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "customers"), orderBy("joinDate", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newCustomers = snapshot.docs.map(doc => doc.data());
      setCustomers(newCustomers);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h4>Recent Customers</h4>
      {customers.map(customer => (
        <div key={customer.customerId}>{customer.email} - Joined: {customer.joinDate.toDate().toDateString()}</div>
      ))}
    </div>
  );
};

export default CustomersWidget;
