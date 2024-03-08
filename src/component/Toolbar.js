import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import checkoutIcon from './img/Checkout.png'; // Adjust the path as necessary
import logo from '../logo.png'; // Adjust the path as necessary
import { useCart } from '../context/CartContext'; // Ensure this import is correct

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #9dd2ac;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
`;

const Logo = styled.div`
  img {
    height: 40px;
  }
`;

// Adjusted to center the items only when they are visible
const NavigationItems = styled.div`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  margin: 0 auto; // Centers the navigation items

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: black;
    text-decoration: none;
    margin: 0 10px;
    font-weight: 300;
  }
`;

const ProdukterButton = styled.div`
  a {
    color: black;
    text-decoration: none;
    font-weight: 300;
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    color: black;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 10px; // Ensures some spacing
  }
`;

const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px; // Ensures some spacing
  cursor: pointer;
  position: relative;

  img {
    height: 24px;
  }
`;

const CartItemCount = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
`;

const RightItemsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MobileMenu = styled.div`
  display: none; // Initially hidden

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    top: 56px;
    left: 0;
    width: 100%;
    background: white;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 100;

    a {
      color: #333;
      text-decoration: none;
      margin: 10px 0;
      font-size: 1.2rem;
      font-family: 'Playfair Display', serif;
    }
  }
`;

const Toolbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Nav>
      <Logo>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </Logo>
      <NavigationItems isVisible={isHomePage}>
        <a href="#home">Hjem</a>
        <a href="#who-we-are">Hvem er vi</a>
        <a href="#sustainable-coffee">Bærekraftig kaffe</a>
        <a href="#gallery">Galleri</a>
        <a href="#contact">Kontakt</a>
      </NavigationItems>
      <RightItemsContainer>
        <ProdukterButton>
          <Link to="/products">Produkter</Link>
        </ProdukterButton>
        {cartItemCount > 0 && (
          <CartIconContainer>
            <Link to="/cart">
              <img src={checkoutIcon} alt="Cart" />
              <CartItemCount>{cartItemCount}</CartItemCount>
            </Link>
          </CartIconContainer>
        )}
        {/* Only render the MobileIcon if on the homepage */}
        {isHomePage && (
          <MobileIcon onClick={toggleMobileMenu}>☰</MobileIcon>
        )}
      </RightItemsContainer>
      {isHomePage && isMobileMenuOpen && (
        <MobileMenu isOpen={isMobileMenuOpen}>
          <a href="#home">Hjem</a>
          <a href="#who-we-are">Hvem er vi</a>
          <a href="#sustainable-coffee">Bærekraftig kaffe</a>
          <a href="#gallery">Galleri</a>
          <a href="#contact">Kontakt</a>
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Toolbar;
