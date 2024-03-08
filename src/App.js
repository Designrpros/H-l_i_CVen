import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Home from './Pages/Home';
import ProductShowcase from './component/ProductShowcase';
import ProductListing from './component/ProductListing';
import Cart from './component/Cart';
import Dashboard from './component/admin/Dashboard';
import Toolbar from './component/Toolbar';
import SuccessPage from './component/SuccessPage';
import CancelPage from './component/CancelPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';

// Initialize GA4 with your Measurement ID
ReactGA.initialize('G-ND7ZZY1GLW');

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    // Track page view on route change
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
}

function App() {
  usePageViews(); // Call our page view hook

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
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
