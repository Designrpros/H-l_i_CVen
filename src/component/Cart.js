import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import stripePromise from '../stripe/stripeClient';

const CartContainer = styled.div`
  margin: 50px 20px;
  padding: 20px;
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
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
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
        : 'https://h-l-i-c-ven.vercel.app';
    
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
      console.error(result.error.message);
    }
};

  
  

  return (
    <CartContainer>
      <h2>Handleliste</h2>
      <CartTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Total Price</TableHeader>
            <TableHeader>Remove</TableHeader>
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
                <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </CartTable>
      <TotalContainer>
        <strong>Total: {calculateOverallTotal().toFixed(2)}NOK</strong>
      </TotalContainer>
      <div>
      <input
          name="line1"
          value={address.line1}
          onChange={handleAddressChange}
          placeholder="Adresse Linje 1"
        />
        <input
          name="line2"
          value={address.line2}
          onChange={handleAddressChange}
          placeholder="Adresse Linje 2"
        />
        <input
          name="city"
          value={address.city}
          onChange={handleAddressChange}
          placeholder="By"
        />
        <input
          name="state"
          value={address.state}
          onChange={handleAddressChange}
          placeholder="Fylke"
        />
        <input
          name="postal_code"
          value={address.postal_code}
          onChange={handleAddressChange}
          placeholder="Postnummer"
        />
        <input
          name="country"
          value={address.country}
          onChange={handleAddressChange}
          placeholder="Land"
        />
      </div>
      <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
    </CartContainer>
  );
};

export default Cart;
