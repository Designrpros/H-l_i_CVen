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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const { orders } = await response.json();

        const customerMap = orders.reduce((acc, order) => {
          // Assuming `customerId` is a field in your order data
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

        setCustomers(Object.values(customerMap));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

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
