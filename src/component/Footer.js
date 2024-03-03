// components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Footer = () => (
  <FooterWrapper>
    © 2024 HØL I CVEN - All rights reserved.
  </FooterWrapper>
);

export default Footer;
