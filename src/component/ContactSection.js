import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 50px 20px;
  background-color: #9dd2ac;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 30px;
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

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 0; /* Updated for no border radius */
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 0; /* Updated for no border radius */
  height: 150px;
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
`;

const ContactInfo = styled.div`
  margin-top: 40px;
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
    </Section>
  );
};

export default ContactSection;
