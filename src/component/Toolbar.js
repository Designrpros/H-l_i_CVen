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
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 56px; // Adjust based on your navbar height
    left: 0;
    width: 100%;
    background: white;
    padding: 10px 20px;
    box-sizing: border-box;

    a {
      margin: 10px 0;
    }
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
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </Logo>
      <NavigationItems>
        <a href="/">Hjem</a>
        <a href="/who-we-are">Hvem er vi</a>
        <a href="/what-we-do">Hva gjør vi</a>
        <a href="/sustainable-coffee">Bærekraftig kaffe</a>
        <a href="/gallery">Galleri</a>
        <a href="/contact">Kontakt</a>
      </NavigationItems>
      <MobileIcon onClick={toggleMobileMenu}>☰</MobileIcon>
      {isMobileMenuOpen && (
        <MobileMenu>
          <a href="/">Hjem</a>
          <a href="/who-we-are">Hvem er vi</a>
          <a href="/what-we-do">Hva gjør vi</a>
          <a href="/sustainable-coffee">Bærekraftig kaffe</a>
          <a href="/gallery">Galleri</a>
          <a href="/contact">Kontakt</a>
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Toolbar;
