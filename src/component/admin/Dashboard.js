import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';
import Analytics from './Analytics';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';

const Toolbar = styled.nav`
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between; // Adjusted for space-between
  padding: 0 20px;
  height: 56px;
  box-sizing: border-box;
  z-index: 100;
`;

const ToolbarContent = styled.div`
  display: flex;
  justify-content: start; // Adjusted for start alignment
  align-items: center;
  width: auto; // Adjusted to auto to take only necessary space

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
`;

const MobileMenuIcon = styled.div`
  display: none; // Initially hidden
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex; // Show on mobile
    margin-left: auto; // Push everything else to the right
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
          <ToolbarLink to="/admin/products">Product Management</ToolbarLink>
          <ToolbarLink to="/admin/orders">Order Management</ToolbarLink>
          <ToolbarLink to="/admin/customers">Customer Management</ToolbarLink>
          <ToolbarLink to="/admin/analytics">Analytics</ToolbarLink>
        </ToolbarContent>
          <MobileMenuIcon onClick={toggleMobileMenu}>☰</MobileMenuIcon>
      </Toolbar>
      <MobileMenu isOpen={isMobileMenuOpen}>
        <ToolbarLink to="/admin/dashboard">Dashboard</ToolbarLink>
        <ToolbarLink to="/admin/products">Product Management</ToolbarLink>
        <ToolbarLink to="/admin/orders">Order Management</ToolbarLink>
        <ToolbarLink to="/admin/customers">Customer Management</ToolbarLink>
        <ToolbarLink to="/admin/analytics">Analytics</ToolbarLink>
      </MobileMenu>
      <MainContent>
        <Routes>
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="analytics" element={<Analytics />} />
          {/* Add more routes as needed */}
        </Routes>
      </MainContent>
    </>
  );
};

export default Dashboard;
