import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebaseConfig'; // Ensure this import path is correct
import { collection, getDocs } from "firebase/firestore"; // Import collection and getDocs

const Container = styled.div`
  padding: 20px;
`;

const CustomerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CustomerItem = styled.li`
  background: #f0f0f0;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Info = styled.p`
  margin: 5px 0;
`;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError('');
      try {
        const querySnapshot = await getDocs(collection(db, 'customers'));
        const customersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Failed to load customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h1>Customer Management</h1>
      <CustomerList>
        {customers.map((customer) => (
          <CustomerItem key={customer.id}>
            <Info>Email: {customer.email}</Info>
            <Info>Total Spent: {(customer.totalSpent / 100).toFixed(2)} NOK</Info>
            <Info>Orders: {customer.orders?.length || 0}</Info>
          </CustomerItem>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
