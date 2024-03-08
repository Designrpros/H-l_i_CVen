import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Styled components here

const SuccessPage = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/order/${sessionId}`);
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
      {orderDetails && (
        <OrderDetails>
          <DetailItem><strong>Ordre-ID:</strong> {orderDetails.id}</DetailItem>
          <DetailItem><strong>Totalbeløp:</strong> {orderDetails.totalAmount} NOK</DetailItem>
          <DetailItem><strong>Varer:</strong></DetailItem>
          <ul>
            {orderDetails.productsPurchased.map((item, index) => (
              <li key={index}>{item.name} - Antall: {item.quantity} - Pris per enhet: {item.unitPrice / 100} NOK</li>
            ))}
          </ul>
          <DetailItem><strong>Leveringsadresse:</strong> {orderDetails.shippingDetails ? `${orderDetails.shippingDetails.name}, ${orderDetails.shippingDetails.address.line1}, ${orderDetails.shippingDetails.address.city}` : 'N/A'}</DetailItem>
        </OrderDetails>
      )}
    </Container>
  );
};

export default SuccessPage;
