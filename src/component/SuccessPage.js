import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext'; // Ensure this path is correct

const Container = styled.div`
  max-width: 800px;
  margin: 80px auto; /* Adjusted for toolbar */
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: #fff;
`;

const Title = styled.h2`
  color: #4CAF50;
  margin-bottom: 20px; /* Added margin for spacing */
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

const DetailItem = styled.div` /* Changed from p to div for better control */
  margin: 10px 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.strong` /* Added for label styling */
  display: block; /* Ensure line break for Order ID */
  margin-bottom: 5px; /* Spacing between label and value */
`;

const ListItem = styled.li`
  margin: 5px 0;
`;

const List = styled.ul`
  list-style-type: none; /* Remove default list styling */
  padding: 0;
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
        const response = await fetch(`https://your-backend.com/api/order/${sessionId}`); // Use your actual server URL here
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
  }, [sessionId, clearCart]);

  return (
    <Container>
      <Title>Takk for din bestilling!</Title>
      <Text>Transaksjonen var vellykket. Her er detaljene for din bestilling:</Text>
      <OrderDetails>
        <DetailItem>
          <DetailLabel>Ordre-ID:</DetailLabel> 
          {orderDetails.id || 'Laster...'}
        </DetailItem>
        <DetailItem>
          <DetailLabel>Totalbeløp:</DetailLabel> 
          {orderDetails.totalAmount ? `${orderDetails.totalAmount / 100} NOK` : 'Laster...'}
        </DetailItem>
        <DetailItem>
          <DetailLabel>Varer:</DetailLabel>
          <List>
            {orderDetails.productsPurchased.length > 0 ? orderDetails.productsPurchased.map((item, index) => (
              <ListItem key={index}>{item.name} - Antall: {item.quantity} - Pris per enhet: {item.unitPrice / 100} NOK</ListItem>
            )) : <li>Laster...</li>}
          </List>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Leveringsadresse:</DetailLabel>
          {orderDetails.shippingDetails && orderDetails.shippingDetails.name && orderDetails.shippingDetails.address ? `${orderDetails.shippingDetails.name}, ${orderDetails.shippingDetails.address.line1}, ${orderDetails.shippingDetails.address.city}` : 'Ikke tilgjengelig'}
        </DetailItem>
      </OrderDetails>
    </Container>
  );
};

export default SuccessPage;
