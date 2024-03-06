// Widget.js
import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const WidgetTitle = styled.h3`
  margin: 0;
  padding: 0;
  color: #333;
`;

const WidgetValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const Widget = ({ title, value }) => {
  return (
    <WidgetContainer>
      <WidgetTitle>{title}</WidgetTitle>
      <WidgetValue>{value}</WidgetValue>
    </WidgetContainer>
  );
};

export default Widget;
