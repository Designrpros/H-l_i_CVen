import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const OrdersList = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

// Additional styles for detail and responsiveness
const Detail = styled.p`
  margin: 5px 0;
  color: #666;
`;

const ErrorMsg = styled.p`
  color: red;
`;

const LoadingMsg = styled.p`
  color: #333;
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/orders`;
      setLoading(true);
      setError('');
      try {
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

  if (loading) return <LoadingMsg>Loading orders...</LoadingMsg>;
  if (error) return <ErrorMsg>{error}</ErrorMsg>;

  return (
    <OrdersContainer>
      <Header>Order Management</Header>
      <OrdersList>
        {orders.sort((a, b) => b.createdAt - a.createdAt)
          .map((order) => (
            <OrderItem key={order.id}>
              <div>
                <Detail><strong>Order ID:</strong> {order.id}</Detail>
                <Detail><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</Detail>
                <Detail><strong>Total:</strong> ${(order.totalAmount / 100).toFixed(2)}</Detail>
              </div>
              {/* Implement additional details and actions here */}
            </OrderItem>
          ))}
      </OrdersList>
    </OrdersContainer>
  );
};

export default OrderManagement;

