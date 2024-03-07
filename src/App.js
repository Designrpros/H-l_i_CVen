import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductShowcase from './component/ProductShowcase';
import ProductListing from './component/ProductListing'; 
import Cart from './component/Cart';
import Dashboard from './component/admin/Dashboard'; // Import the Dashboard component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import Toolbar from './component/Toolbar';
import SuccessPage from './component/SuccessPage';
import CancelPage from './component/CancelPage';

function App() {
  return (
    <Router>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductShowcase />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        {/* Correctly placed Dashboard route */}
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
