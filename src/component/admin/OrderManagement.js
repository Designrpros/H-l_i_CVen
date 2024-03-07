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

  useEffect(() => {
    const fetchOrders = async () => {
      const endpoint = '/api/orders'; // Adjust the URL as per your route
      console.log("Fetching orders from:", endpoint);

      try {
        const response = await fetch(endpoint);
        console.log("Response status:", response.status);
        // Uncomment the next line if you want to see all response headers
        // console.log("Response headers:", response.headers);

        if (!response.ok) {
          const errorBody = await response.text(); // or response.json() if you expect a JSON error response
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}, Body: ${errorBody}`);
        }

        const data = await response.json();
        console.log("Orders fetched:", data.orders);
        setOrders(data.orders); // Assuming the response has an orders array
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrdersContainer>
      <h1>Order Management</h1>
      {orders.sort((a, b) => b.createdAt - a.createdAt) // Sort orders by createdAt descending
        .map((order) => (
          <OrderItem key={order.id}>
            {/* Display order details here */}
            <p>Order ID: {order.id}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${(order.totalAmount / 100).toFixed(2)}</p>
            {/* Add more details as needed */}
          </OrderItem>
        ))}
    </OrdersContainer>
  );
};

export default OrderManagement;
