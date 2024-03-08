import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
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


const SuccessPage = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    totalAmount: 0,
    productsPurchased: [],
    shippingDetails: { name: '', address: { line1: '', city: '' } }
  }); // Initialize with default structure

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Update the URL to match your backend endpoint
        const response = await fetch(`https://holicven-0ef273556045.herokuapp.com/api/order/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
  
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  return (
    <Container>
      <Title>Takk for din bestilling!</Title>
      <Text>Transaksjonen var vellykket. Her er detaljene for din bestilling:</Text>
      <OrderDetails>
        <DetailItem><strong>Ordre-ID:</strong> {orderDetails.id || 'Laster...'}</DetailItem>
        <DetailItem><strong>Totalbeløp:</strong> {orderDetails.totalAmount ? `${orderDetails.totalAmount} NOK` : 'Laster...'}</DetailItem>
        <DetailItem><strong>Varer:</strong></DetailItem>
        <ul>
          {orderDetails.productsPurchased.length > 0 ? orderDetails.productsPurchased.map((item, index) => (
            <li key={index}>{item.name} - Antall: {item.quantity} - Pris per enhet: {item.unitPrice / 100} NOK</li>
          )) : <li>Laster...</li>}
        </ul>
        <DetailItem><strong>Leveringsadresse:</strong> {orderDetails.shippingDetails.name ? `${orderDetails.shippingDetails.name}, ${orderDetails.shippingDetails.address.line1}, ${orderDetails.shippingDetails.address.city}` : 'Laster...'}</DetailItem>
      </OrderDetails>
    </Container>
  );
};

export default SuccessPage;
