import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: #f5f5f5;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
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

const Checkbox = styled.input`
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
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
        setOrders(data.orders.map(order => ({ ...order, shipped: false }))); // Add 'shipped' property
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleShippedChange = (orderId) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, shipped: !order.shipped } : order));
  };

  const handleSendConfirmation = async (orderId) => {
    // Assuming you have an endpoint set up to handle sending confirmation emails
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/send-confirmation`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      // Handle error (e.g., show an error message)
    }
  };
  
  

  if (loading) return <LoadingMsg>Loading orders...</LoadingMsg>;
  if (error) return <ErrorMsg>{error}</ErrorMsg>;

  return (
    <OrdersContainer>
      <Header>Order Management</Header>
      <OrdersTable>
      <thead>
        <tr>
          <TableHeader>Shipped</TableHeader>
          <TableHeader>Send Confirmation</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Product Name</TableHeader>
          <TableHeader>Customer's Name</TableHeader>
          <TableHeader>Order ID</TableHeader>
        </tr>
      </thead>
      <tbody>
        {orders.sort((a, b) => b.createdAt._seconds - a.createdAt._seconds).map((order) => (
          <TableRow key={order.id}>
              <SendButton onClick={() => handleSendConfirmation(order.id)}>Send</SendButton>
            <TableCell>
                <Checkbox type="checkbox" checked={order.shipped} onChange={() => handleShippedChange(order.id)} />
              </TableCell>
                <TableCell>{new Date(order.createdAt._seconds * 1000).toLocaleDateString()}</TableCell>
                <TableCell>{order.totalAmount / 100} NOK</TableCell>
                <TableCell>{order.productsPurchased.map(p => p.name).join(', ')}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.id}</TableCell>
              <TableCell>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
      </OrdersTable>
    </OrdersContainer>
  );
};

export default OrderManagement;
