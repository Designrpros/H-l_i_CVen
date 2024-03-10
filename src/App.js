import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductShowcase from './component/ProductShowcase';
import ProductListing from './component/ProductListing'; 
import Cart from './component/Cart';
import Dashboard from './component/admin/Dashboard';
import './App.css';
import Toolbar from './component/Toolbar';
import SuccessPage from './component/SuccessPage';
import CancelPage from './component/CancelPage';
import SignInPage from './component/SignInPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

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
          <Route path="/admin/*" element={isAuthenticated ? <Dashboard /> : <SignInPage />} />
        </Routes>
      </Router>
  );
}

export default App;
