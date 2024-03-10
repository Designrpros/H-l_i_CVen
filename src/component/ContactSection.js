import React from 'react';
import styled from 'styled-components';
import { useContact } from '../context/ContactContext'; // Adjust the path as necessary
import facebookIcon from './img/facebook.svg'; // Update the path as necessary
import instagramIcon from './img/instagram.webp'; // Update the path as necessary

const Section = styled.section`
  background-color: #9dd2ac;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 5px;
  padding: 50px 0px;
  font-size: 2.5rem;
  color: #333;
`;

const MessageText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: #fff;
  color: #000;
  padding: 10px 20px;
  margin: 10px;
  border: 2px solid black;
  text-decoration: none;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    background-color: #ccc; // Gray layer
    top: 3px;
    left: 3px;
    right: -3px;
    bottom: -3px;
    z-index: -1;
  }

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const MapContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  margin-top: 20px;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const IconLink = styled.a`
  display: inline-block;
`;

const SocialIcon = styled.img`
  width: 40px; // Adjust size as needed
  height: auto;
`;

const ContactSection = () => {
  const { contactInfo } = useContact(); // Destructure to get contactInfo

  return (
    <Section id="contact">
      <SectionTitle>Kontakt Oss</SectionTitle>
      {/* Use contactInfo.description here */}
      <MessageText>{contactInfo.description}</MessageText>
      <ContactInfoContainer>
        <ContactButton href={`mailto:${contactInfo.email}`}>{contactInfo.email}</ContactButton>
        <ContactButton href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</ContactButton>
      </ContactInfoContainer>
      <IconContainer>
        <IconLink href="https://www.facebook.com/holivcen/" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={facebookIcon} alt="Facebook" />
        </IconLink>
        <IconLink href="https://www.instagram.com/holicven/" target="_blank" rel="noopener noreferrer">
          <SocialIcon src={instagramIcon} alt="Instagram" />
        </IconLink>      </IconContainer>
      <MapContainer>
        <StyledIframe
          title="Location"
          src={contactInfo.mapUrl}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </StyledIframe>
      </MapContainer>
    </Section>
  );
};


export default ContactSection;
