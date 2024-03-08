import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 50px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Text = styled.p`
  margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const CancelPage = () => {
  return (
    <Container>
      <Title>Transaksjon Avbrutt</Title>
      <Text>Utsjekkingsprosessen ble ikke fullført.</Text>
      <StyledLink to="/cart">Gå tilbake til handlekurven</StyledLink>
      eller
      <StyledLink to="/products">Se våre produkter</StyledLink>
    </Container>
  );
};

export default CancelPage;
