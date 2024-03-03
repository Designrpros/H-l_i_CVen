import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Section = styled.section`
  background-color: #9dd2ac;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 5px;
  padding: 50px 0px ;
  font-size: 2.5rem;
  color: #333;
`;

const MessageText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactInfo = styled.div`
  margin-top: 40px;
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
  color: inherit; // Adjust as needed
`;


const ContactSection = () => {
  return (
    <Section id="contact">
      <SectionTitle>Kontakt Oss</SectionTitle>
      <MessageText>Ønsker dere knallgod kaffe med mening, eller å starte opp en Høl i CVen Truck eller Cafe i deres kommune ved å bruke våres konsept. Ta gjerne kontakt :)</MessageText>
      <ContactInfo>
        <p>Email: contact@example.com</p>
        <p>Telefon: +47 90258682</p>
      </ContactInfo>
      <IconContainer>
        <IconLink href="https://www.facebook.com/holivcen/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookF} size="2x" />
        </IconLink>
        <IconLink href="https://www.instagram.com/holicven/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </IconLink>
      </IconContainer>
      <MapContainer>
        <StyledIframe
          title="Sandvika, Norway"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7961.917753982422!2d10.5276898!3d59.8887301!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDUzJzE5LjAiTiAxMMKwMzEnMzkuNyJF!5e0!3m2!1sen!2sus!4v1664292423496!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </StyledIframe>
      </MapContainer>
    </Section>
  );
};

export default ContactSection;
