import React from 'react';
import styled from 'styled-components';
import Toolbar from './component/Toolbar';
import Home from './Pages/Home'; // Import the Home component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';

const StyledWrapper = styled.div`
  text-align: center;
`;

const StyledHeading = styled.h1`
  color: #333;
`;

function App() {
  return (
    <>
      <Toolbar />
      <StyledWrapper>
        <Home />
      </StyledWrapper>
    </>
  );
}

export default App;
