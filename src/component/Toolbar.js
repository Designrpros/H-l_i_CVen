import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import checkoutIcon from './img/Checkout.png'; // Adjust the path as necessary
import logo from '../logo.png'; // Adjust the path as necessary

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

const NavigationItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  @media (max-width: 768px) {
    display: none; // Hide navigation items on mobile by default
  }

  a {
    color: black;
    text-decoration: none;
    margin: 0 10px;
    font-weight: 300;
  }
`;

const ProdukterButton = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    right: 60px; // Adjust based on your design
  }

  a {
    color: black;
    text-decoration: none;
    font-weight: 300;
    margin-left: auto; // This will push the Produkter button to the end
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    color: black;
    font-size: 1.5rem;
    cursor: pointer;
  }
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

const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;

  // You might want to adjust the size of the checkout icon image here
  img {
    height: 24px; // Example size, adjust as needed
  }
`;

const Toolbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const shouldShowCartIcon = location.pathname.startsWith('/product/') || location.pathname.startsWith('/products');
  const shouldHideItems = location.pathname.startsWith('/product/') || location.pathname.startsWith('/products');

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
      {!shouldHideItems && (
        <>
          <NavigationItems>
            <a href="#home">Hjem</a>
            <a href="#who-we-are">Hvem er vi</a>
            <a href="#sustainable-coffee">Bærekraftig kaffe</a>
            <a href="#gallery">Galleri</a>
            <a href="#contact">Kontakt</a>
          </NavigationItems>
          <MobileIcon onClick={toggleMobileMenu}>☰</MobileIcon>
        </>
      )}
      <ProdukterButton>
        <Link to="/products">Produkter</Link>
      </ProdukterButton>
      {/* Only show the mobile menu if it's not a product showcase or products page */}
      {!shouldHideItems && isMobileMenuOpen && (
        <MobileMenu isOpen={isMobileMenuOpen}>
          <a href="#home">Hjem</a>
          <a href="#who-we-are">Hvem er vi</a>
          <a href="#sustainable-coffee">Bærekraftig kaffe</a>
          <a href="#gallery">Galleri</a>
          <a href="#contact">Kontakt</a>
        </MobileMenu>
      )}
      {shouldShowCartIcon && (
    <CartIconContainer>
      <Link to="/cart">
        <img src={checkoutIcon} alt="Cart" />
      </Link>
    </CartIconContainer>
  )}
    </Nav>
  );
};

export default Toolbar;
