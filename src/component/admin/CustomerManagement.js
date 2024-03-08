import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const { orders } = await response.json();

        // Aggregate orders by customerId
        const customerMap = orders.reduce((acc, order) => {
          // Assuming each order has a customerId and customerEmail
          const { customerId, customerEmail } = order;
          if (!acc[customerId]) {
            acc[customerId] = {
              email: customerEmail,
              orders: [],
              totalSpent: 0,
            };
          }
          acc[customerId].orders.push(order);
          acc[customerId].totalSpent += order.totalAmount;
          return acc;
        }, {});

        // Convert the map to an array
        const customerArray = Object.keys(customerMap).map(customerId => ({
          ...customerMap[customerId],
          customerId,
        }));

        setCustomers(customerArray);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load customer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <h1>Customer Management</h1>
      <CustomerList>
        {customers.map((customer, index) => (
          <CustomerItem key={index}>
            <p>Email: {customer.email}</p>
            <p>Total Spent: {(customer.totalSpent / 100).toFixed(2)} NOK</p>
            <p>Orders: {customer.orders.length}</p>
          </CustomerItem>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
