import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background-color: #9dd2ac;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 30px;

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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 0; /* Updated for no border radius */
  box-sizing: border-box; /* Ensures padding doesn't add to the width */

  @media (max-width: 768px) {
    padding: 8px; /* Slightly smaller padding on smaller screens */
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 0; /* Updated for no border radius */
  height: 150px;
  box-sizing: border-box; /* Ensures padding doesn't add to the width */

  @media (max-width: 768px) {
    padding: 8px; /* Slightly smaller padding on smaller screens */
    height: 120px; /* Slightly smaller height on smaller screens */
  }
`;

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
  width: 100%; /* Ensures the form is responsive */

  @media (max-width: 768px) {
    padding: 0 10px; /* Adds padding on smaller screens to prevent form touching the screen edges */
  }
`;

const SubmitButton = styled.button`
  position: relative;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0; /* No border radius */
  overflow: hidden; /* Ensures pseudo-elements don't overflow */
  width: 100%; /* Makes the button full width */
  max-width: 200px; /* Limits button width on larger screens */
  margin: 0 auto; /* Centers the button */

  &:before {
    content: '';
    position: absolute;
    top: 3px; /* Slight offset for the shadow effect */
    left: 3px; /* Slight offset for the shadow effect */
    background-color: #666; /* Dark gray for the shadow */
    width: calc(100% - 6px); /* Adjust width based on offset */
    height: calc(100% - 6px); /* Adjust height based on offset */
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 8px 15px; /* Adjust padding for smaller screens */
  }
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
const ContactSection = () => {
  return (
    <Section id="contact">
      <SectionTitle>Kontakt Oss</SectionTitle>
      <MessageText>Ønsker dere knallgod kaffe med mening, eller å starte opp en Høl i CVen Truck eller Cafe i deres kommune ved å bruke våres konsept. Ta gjerne kontakt :)</MessageText>
      <Form>
        <Input type="text" placeholder="Navn" />
        <Input type="email" placeholder="Email" />
        <TextArea placeholder="Din melding"></TextArea>
        <SubmitButton type="submit">Send Melding</SubmitButton>
      </Form>
      <ContactInfo>
        <p>Email: contact@example.com</p>
        <p>Telefon: +47 90258682</p>
      </ContactInfo>
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
