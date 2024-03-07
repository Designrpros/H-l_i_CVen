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
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
`;

const Detail = styled.p`
  margin: 0 10px;
  color: #666;
  flex: none; /* Prevent flex items from growing or shrinking */
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const ScrollableID = styled.div`
  max-width: 100px; /* Adjust based on your layout needs */
  overflow-x: auto;
  white-space: nowrap;
`;

const IDDetail = styled(Detail)`
  display: inline-block; /* Make sure the ID detail itself is inline */
  margin: 0; /* Adjust as needed */
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
        {orders.sort((a, b) => b.createdAt._seconds - a.createdAt._seconds)
          .map((order) => (
            <OrderItem key={order.id}>
            <DetailContainer>
              <Detail><strong>Date:</strong> {new Date(order.createdAt._seconds * 1000).toLocaleDateString()}</Detail>
              <Detail><strong>Price:</strong> {order.totalAmount / 100} NOK</Detail>
              <Detail><strong>Product Name:</strong> {order.productsPurchased.map(p => p.name).join(', ')}</Detail>
              <Detail><strong>Customer's Name:</strong> {order.email}</Detail>
            </DetailContainer>
            <ScrollableID>
              <IDDetail><strong>Order ID:</strong> {order.id}</IDDetail>
            </ScrollableID>
          </OrderItem>
          ))}
      </OrdersList>
    </OrdersContainer>
  );
};

export default OrderManagement;
