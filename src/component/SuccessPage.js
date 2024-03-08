import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  const session_id = new URLSearchParams(location.search).get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Replace this URL with your backend endpoint
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/order/${session_id}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (session_id) {
      fetchOrderDetails();
    }
  }, [session_id]);

  return (
    <Container>
      <Title>Takk for din bestilling!</Title>
      <Text>Transaksjonen var vellykket. Her er detaljene for din bestilling:</Text>
      {orderDetails ? (
        <OrderDetails>
          <DetailItem><strong>Ordre-ID:</strong> {orderDetails.id}</DetailItem>
          <DetailItem><strong>Totalbeløp:</strong> {orderDetails.amount}</DetailItem>
          <DetailItem><strong>Varer:</strong></DetailItem>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item.name} - Antall: {item.quantity}</li>
            ))}
          </ul>
        </OrderDetails>
      ) : (
        <Text>Laster ordredetaljer...</Text>
      )}
    </Container>
  );
}

export default SuccessPage;
