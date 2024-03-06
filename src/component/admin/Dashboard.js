// Dashboard.js
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// Import your page components here
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';
import Analytics from './Analytics';
import DashboardOverview from './DashboardOverview'; // Adjust the import path as necessary

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row; // Ensures sidebar is on the left
  height: calc(100vh); // Adjust 64px according to your toolbar's height
  margin-top: 55px; // Same as your toolbar's height
`;

const Sidebar = styled.div`
  width: 250px; // or whatever your sidebar width is
  background-color: #333;
  color: white;
  padding: 20px;
  height: 100%; // Makes sure it fills the vertical space
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f4f4f4;
  overflow-y: auto; // Adds scroll to content if needed
`;


const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin: 10px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Dashboard = () => {
  return (
      <DashboardContainer>
        <Sidebar>
          <h2>Admin Panel</h2>
          <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
          <StyledLink to="/admin/products">Product Management</StyledLink>
          <StyledLink to="/admin/orders">Order Management</StyledLink>
          <StyledLink to="/admin/customers">Customer Management</StyledLink>
          <StyledLink to="/admin/analytics">Analytics</StyledLink>
        </Sidebar>
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
      </DashboardContainer>
  );
};

export default Dashboard;
