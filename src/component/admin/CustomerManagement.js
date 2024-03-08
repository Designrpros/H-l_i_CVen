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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/orders`;
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const orders = data.orders;

        const customersData = orders.reduce((acc, order) => {
          // Assuming each order has a unique customer identifier
          const customerId = order.customerId || 'unknown'; // Use a unique identifier for each customer
          if (!acc[customerId]) {
            acc[customerId] = {
              email: order.email, // Assuming email is directly on the order
              orders: [],
              totalSpent: 0,
            };
          }
          acc[customerId].orders.push(order);
          acc[customerId].totalSpent += order.totalAmount;
          return acc;
        }, {});

        // Convert the object back into an array for rendering
        const customersArray = Object.keys(customersData).map(key => ({
          ...customersData[key],
          customerId: key,
          averageOrderValue: customersData[key].orders.length ? (customersData[key].totalSpent / customersData[key].orders.length) : 0,
        }));

        setCustomers(customersArray);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <Container>
      <h1>Customer Management</h1>
      <CustomerList>
        {customers.map((customer, index) => (
          <CustomerItem key={index}>
            <p>Email: {customer.email}</p>
            <p>Total Spent: {(customer.totalSpent / 100).toFixed(2)} NOK</p>
            <p>Orders: {customer.orders.length}</p>
            <p>Average Order Value: {(customer.averageOrderValue / 100).toFixed(2)} NOK</p>
          </CustomerItem>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
