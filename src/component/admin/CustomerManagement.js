import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const orders = data.orders;

        // Aggregate customer data from orders
        const customerData = orders.reduce((acc, order) => {
          const { customerId, customerEmail } = order;
          if (!acc[customerId]) {
            acc[customerId] = {
              email: customerEmail,
              totalSpent: 0,
              orders: [],
            };
          }
          acc[customerId].totalSpent += order.totalAmount;
          acc[customerId].orders.push(order);
          return acc;
        }, {});

        setCustomers(Object.values(customerData));
      } catch (error) {
        setError('Failed to load customers.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h1>Customer Management</h1>
      <CustomerList>
        {customers.map((customer, index) => (
          <CustomerItem key={index}>
            <Info>Email: {customer.email}</Info>
            <Info>Total Spent: {(customer.totalSpent / 100).toFixed(2)} NOK</Info>
            <Info>Orders: {customer.orders.length}</Info>
          </CustomerItem>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
