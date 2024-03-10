import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';
import WebsiteBuilder from './builder/WebsiteBuilder';

const Toolbar = styled.nav`
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; // Center the content
  padding: 0 20px;
  height: 56px;
  box-sizing: border-box;
  z-index: 100;
`;

const ToolbarContent = styled.div`
  display: flex;
  justify-content: center; // Center the links
  align-items: center;
  flex-grow: 1; // Allow it to grow as needed

  @media (max-width: 768px) {
    display: none; // Hide the toolbar content on mobile
  }
`;

const ToolbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    display: block; // Ensure links are displayed in the mobile menu
    width: 100%; // Take full width for better touch targets
    text-align: center; // Center align the text for aesthetics
  }
`;

const MobileMenuIcon = styled.div`
  display: none; // Initially hidden
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block; // Show on mobile
    position: absolute;
    right: 20px; // 20px from the right edge
  }
`;


const MobileMenu = styled.div`
  display: none; // Initially hidden

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    top: 112px;
    left: 0;
    width: 100%;
    background: #333;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 100;

    a {
      color: white;
      text-decoration: none;
      margin: 10px 0;
      font-size: 1.2rem;
      font-family: 'Playfair Display', serif;
    }
  }
`;

const MainContent = styled.div`
  padding-top: 112px; // Adjust this value based on the combined height of your toolbars
  overflow-y: auto;
`;

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Toolbar>
        <ToolbarContent>
          <ToolbarLink to="/admin/dashboard">Dashboard</ToolbarLink>
          <ToolbarLink to="/admin/website">Website Builder</ToolbarLink>
          <ToolbarLink to="/admin/products">Product Management</ToolbarLink>
          <ToolbarLink to="/admin/orders">Order Management</ToolbarLink>
          <ToolbarLink to="/admin/customers">Customer Management</ToolbarLink>
        </ToolbarContent>
          <MobileMenuIcon onClick={toggleMobileMenu}>☰</MobileMenuIcon>
      </Toolbar>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <ToolbarLink to="/admin/dashboard">Dashboard</ToolbarLink>
        <ToolbarLink to="/admin/website">Website Builder</ToolbarLink>
        <ToolbarLink to="/admin/products">Product Management</ToolbarLink>
        <ToolbarLink to="/admin/orders">Order Management</ToolbarLink>
        <ToolbarLink to="/admin/customers">Customer Management</ToolbarLink>
      </MobileMenu>
      <MainContent>
        <Routes>
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="website" element={<WebsiteBuilder />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          {/* Add more routes as needed */}
        </Routes>
      </MainContent>
    </>
  );
};

export default Dashboard;
