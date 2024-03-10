// src/components/SignInPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from './img/HØL_I_CVEN_GRØNN.png';

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; /* Increased gap */
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.img`
  width: 120px; /* Adjusted size */
  margin-bottom: 30px; /* Increased spacing */
`;

const WelcomeNote = styled.p`
  font-size: 20px; /* Slightly larger font size */
  text-align: center;
  color: #333;
  margin-bottom: 30px; /* Increased spacing */
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  margin-bottom: 20px; /* Ensure consistent spacing */
`;

const Button = styled.button`
  padding: 15px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  font-size: 16px;
  width: 100%; /* Ensures the button has the same width as input fields */
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;


const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  // JSX for the form
  return (
    <SignInContainer>
      <Card>
        <Logo src={logoImage} alt="Logo" />
        <WelcomeNote>Welcome, please sign in to continue.</WelcomeNote>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Card>
    </SignInContainer>
  );
};

export default SignInPage;
