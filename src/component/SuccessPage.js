import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext'; // Ensure this path is correct

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #4CAF50;
`;

const Text = styled.p`
  margin: 20px 0;
`;

const OrderDetails = styled.div`
  text-align: left;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

const DetailItem = styled.p`
  margin: 10px 0;
`;

const ListItem = styled.li`
  margin: 5px 0;
`;

const SuccessPage = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    totalAmount: 0,
    productsPurchased: [],
    shippingDetails: { name: '', address: { line1: '', city: '' } }
  });

  const { clearCart } = useCart(); // Use the clearCart function from the cart context

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://holicven-0ef273556045.herokuapp.com/api/order/${sessionId}`); // Use your actual server URL here
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderDetails(data);
        clearCart(); // Clear the cart after successfully fetching order details
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId, clearCart]); // Include clearCart in the dependency array

  return (
    <Container>
      <Title>Takk for din bestilling!</Title>
      <Text>Transaksjonen var vellykket. Her er detaljene for din bestilling:</Text>
      <OrderDetails>
        <DetailItem><strong>Ordre-ID:</strong> {orderDetails.id || 'Laster...'}</DetailItem>
        <DetailItem><strong>Totalbeløp:</strong> {orderDetails.totalAmount ? `${orderDetails.totalAmount / 100} NOK` : 'Laster...'}</DetailItem>
        <DetailItem><strong>Varer:</strong></DetailItem>
        <ul>
          {orderDetails.productsPurchased.length > 0 ? orderDetails.productsPurchased.map((item, index) => (
            <ListItem key={index}>{item.name} - Antall: {item.quantity} - Pris per enhet: {item.unitPrice / 100} NOK</ListItem>
          )) : <li>Laster...</li>}
        </ul>
        <DetailItem><strong>Leveringsadresse:</strong> {orderDetails.shippingDetails && orderDetails.shippingDetails.name && orderDetails.shippingDetails.address ? `${orderDetails.shippingDetails.name}, ${orderDetails.shippingDetails.address.line1}, ${orderDetails.shippingDetails.address.city}` : 'Ikke tilgjengelig'}</DetailItem>
      </OrderDetails>
    </Container>
  );
};

export default SuccessPage;
