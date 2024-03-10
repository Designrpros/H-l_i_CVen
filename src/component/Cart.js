import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import stripePromise from '../stripe/stripeClient';

const CartContainer = styled.div`
  margin: 50px 20px;
  padding: 20px;
  @media (max-width: 768px) {
    margin: 20px 10px;
    padding: 10px;
  }
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

const TotalContainer = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const CheckoutButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width: 100%; // Make the button full width on smaller screens
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;
const ScrollView = styled.div`
  overflow-x: auto;
`;

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState({
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    });

  const extractPrice = (priceString) => {
    // This regex matches the first occurrence of a number, potentially with commas or dots
    const match = priceString.match(/(\d+([.,]\d+)?)/);
    if (match) {
      // Replace comma with dot for conversion and return as number
      return Number(match[0].replace(',', '.'));
    }
    return 0; // Return 0 if no number found
  };
  
  const calculateTotalPrice = (quantity, priceString) => {
    const numQuantity = Number(quantity);
    const numPrice = extractPrice(priceString); // Use the extracted price
    console.log(`Calculating total for quantity: ${numQuantity}, price: ${numPrice}`); // Debugging
    return numQuantity * numPrice;
  };
  
  const calculateOverallTotal = () => {
    return cartItems.reduce((acc, item) => {
      console.log(`Item quantity: ${item.quantity}, price: ${item.price}`); // Debugging
      const itemTotal = calculateTotalPrice(item.quantity, item.price);
      console.log(`Item total: ${itemTotal}`); // Debugging
      return acc + itemTotal;
    }, 0);
  };
  
  // Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    
    // Determine the base URL dynamically
    const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:4242' 
        : 'https://holicven-0ef273556045.herokuapp.com';
    
    const response = await fetch(`${baseUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cartItems,
            shippingDetails: address,
        }),
        });
        
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        
        const session = await response.json().catch(error => {
        console.error('Error parsing JSON:', error);
        throw new Error('Error parsing JSON');
        });
        
        const result = await stripe.redirectToCheckout({
        sessionId: session.id,
        }).catch(error => {
        console.error('Stripe Checkout error:', error);
     });
          
  
     if (result.error) {
      // Handle error
      console.error(result.error.message);
    } else {
      // Clear the cart after successful checkout
      clearCart();
    }
};

  
  

  return (
    <CartContainer>
      <h2>Handleliste</h2>
      <ScrollView>
      <CartTable>
      <thead>
        <tr>
          <TableHeader>Navn</TableHeader>
          <TableHeader>Antall</TableHeader>
          <TableHeader>Pris</TableHeader>
          <TableHeader>Totalpris</TableHeader>
          <TableHeader>Fjern</TableHeader>
        </tr>
      </thead>
        <tbody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{calculateTotalPrice(item.quantity, item.price).toFixed(2)}NOK</TableCell>
              <TableCell>
                <RemoveButton onClick={() => removeFromCart(item.id)}>Fjern</RemoveButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </CartTable>
      </ScrollView>
      <TotalContainer>
        <strong>Totalt: {calculateOverallTotal().toFixed(2)} NOK</strong>
      </TotalContainer>
      <CheckoutContainer>
        <CheckoutButton onClick={handleCheckout}>Betal med Stripe</CheckoutButton>
      </CheckoutContainer>
    </CartContainer>
  );
};

export default Cart;
