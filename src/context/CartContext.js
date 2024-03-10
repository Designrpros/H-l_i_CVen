import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cartItems state with items from local storage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const items = localStorage.getItem('cartItems');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Could not parse cart items from localStorage", error);
      return [];
    }
    
  });

  // Use useEffect to update local storage when cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        // If the item already exists in the cart, update its quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        // If the item is new to the cart, add it with its specified quantity
        return [...prevItems, product];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    console.log("Clearing cart...");
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
