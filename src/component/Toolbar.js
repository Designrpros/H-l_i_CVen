import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../logo.png'; // Adjust the path as necessary

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
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
  top: 56px; // Adjust based on your navbar height
  left: 0;
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); // Adds a subtle shadow for depth
  z-index: 100; // Ensure it's above other content

  a {
    color: #333; // Dark color for elegance
    text-decoration: none; // Removes underline
    margin: 10px 0;
    font-size: 1.2rem; // Larger font size
    font-family: 'Playfair Display', serif; // Sexy font
  }
`;


const Toolbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Nav>
      <Logo>
        <a href="#home">
          <img src={logo} alt="Logo" />
        </a>
      </Logo>
      <NavigationItems>
        <a href="#home">Hjem</a>
        <a href="#who-we-are">Hvem er vi</a>
        <a href="#sustainable-coffee">Bærekraftig kaffe</a>
        <a href="#gallery">Galleri</a>
        <a href="#contact">Kontakt</a>
      </NavigationItems>
      <MobileIcon onClick={toggleMobileMenu}>☰</MobileIcon>
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
