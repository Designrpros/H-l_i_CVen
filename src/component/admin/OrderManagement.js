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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f8f8f8; // subtle hover effect
  }
`;

const Detail = styled.p`
  margin: 4px 8px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const ErrorMsg = styled.p`
  color: red;
`;

const LoadingMsg = styled.p`
  color: #333;
`;

// Additional styles for interactive elements
const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; // Adds space between details
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
        {orders.sort((a, b) => b.createdAt._seconds - a.createdAt._seconds)
          .map((order) => (
            <OrderItem key={order.id}>
              <DetailContainer>
                <Detail><strong>Date:</strong> {new Date(order.createdAt._seconds * 1000).toLocaleDateString()}</Detail>
                <Detail><strong>Price:</strong> {order.totalAmount / 100} NOK</Detail>
                <Detail><strong>Product:</strong> {order.productsPurchased.map(p => p.name).join(', ')}</Detail>
                <Detail><strong>Customer:</strong> {order.email}</Detail>
                <Detail><strong>ID:</strong> {order.id}</Detail>
              </DetailContainer>
              {/* Example interactive element */}
              <Button onClick={() => alert(`Order ${order.id} details`)}>View Details</Button>
            </OrderItem>
          ))}
      </OrdersList>
    </OrdersContainer>
  );
};

export default OrderManagement;
