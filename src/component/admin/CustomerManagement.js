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

        const customersData = {};
        orders.forEach(order => {
          const customerId = order.customerId || 'unknown'; // Fallback to 'unknown' if customerId is not set
          if (!customersData[customerId]) {
            customersData[customerId] = {
              email: order.email, // Assuming email is stored directly on the order
              orders: [],
              totalSpent: 0,
            };
          }
          customersData[customerId].orders.push(order);
          customersData[customerId].totalSpent += order.totalAmount;
        });

        // Additional metrics can be calculated here
        Object.values(customersData).forEach(customer => {
          customer.averageOrderValue = customer.orders.length ? (customer.totalSpent / customer.orders.length).toFixed(2) : 0;
        });

        setCustomers(Object.values(customersData));
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
            <p>Average Order Value: {customer.averageOrderValue} NOK</p>
            {/* You can add more detailed metrics here */}
          </CustomerItem>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
