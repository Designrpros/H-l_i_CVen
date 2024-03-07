import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  /* Styles for your container */
`;

const OrderItem = styled.div`
  /* Styles for each order item */
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      // Correctly use the endpoint variable here
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/orders`;    
      setLoading(true);
      setError('');
      try {
        // Use the endpoint variable in the fetch call
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <OrdersContainer>
      <h1>Order Management</h1>
      {orders.sort((a, b) => b.createdAt - a.createdAt)
        .map((order) => (
          <OrderItem key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${(order.totalAmount / 100).toFixed(2)}</p>
          </OrderItem>
        ))}
    </OrdersContainer>
  );
};

export default OrderManagement;
