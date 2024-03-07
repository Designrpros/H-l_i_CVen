import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const CustomerList = styled.div`
  margin-top: 20px;
`;

const CustomerItem = styled.div`
  background: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const customers = {};
      ordersSnapshot.forEach(doc => {
        const order = doc.data();
        if (!customers[order.customerId]) {
          customers[order.customerId] = {
            email: order.customerEmail, // Ensure this matches your Firestore field
            orders: [],
            totalSpent: 0,
          };
        }
        customers[order.customerId].orders.push(order);
        customers[order.customerId].totalSpent += order.totalAmount;
      });
      setCustomers(Object.values(customers));
    };

    fetchCustomers();
  }, []);

  return (
    <Container>
      <h1>Customer Management</h1>
      <CustomerList>
        {customers.map((customer, index) => (
          <CustomerItem key={index}>
            <p>Email: {customer.email}</p>
            <p>Total Spent: {(customer.totalSpent / 100).toFixed(2)}</p>
            <p>Orders: {customer.orders.length}</p>
          </CustomerItem>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
