// components/ProductShowcase.js
import React, { useState } from 'react';
import styled from 'styled-components';
import coffee from './img/coffee.webp'; // Adjust the path as necessary

const ShowcaseWrapper = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed; /* or absolute */
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(${({ show }) => (show ? '0' : '100%')});
  transition: transform 0.3s ease-out;
  background: #fff;
  /* Additional styling */
`;


const ProductShowcase = ({ product, onClose }) => (
  <ShowcaseWrapper show={!!product}>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
      <button onClick={onClose}>Close</button>
  </ShowcaseWrapper>
);

export default ProductShowcase;
