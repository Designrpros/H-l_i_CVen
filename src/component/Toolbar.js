import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
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
  display: flex;
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
`;

const Toolbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isProductShowcase = location.pathname.startsWith('/product/');

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
      {/* Conditionally render NavigationItems and MobileIcon if not on ProductShowcase page */}
      {!isProductShowcase && (
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
      {isMobileMenuOpen && (
        <MobileMenu>
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
