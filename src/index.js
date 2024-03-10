// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CompositeProvider from './context/CompositeProvider'; // Import CompositeProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CompositeProvider>
      <App />
    </CompositeProvider>
  </React.StrictMode>
);

reportWebVitals();
