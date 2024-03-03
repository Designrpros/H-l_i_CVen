// components/AboutSection.js
import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.section`
  padding: 50px 20px;
  background: #9dd2ac;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const Text = styled.p`
  font-size: 1rem;
  max-width: 800px;
  line-height: 1.6;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #333;
`;

const AboutSection = () => (
  <AboutWrapper id="who-we-are">
    <Heading>HVEM ER VI</Heading>
    <Text>
      <Highlight>Det finnes ulike grunner til at mennesker får hull i cven:</Highlight> sykdom, vanskelig oppvekst, mobbing, konsetrasjonsvansker og nedbemanning nå som korona pandemien setter ut mange av jobb. Alle mennesker har ulike ressurser som kan komme dem tilnytte om man gir dem sjansen.
    </Text>
    <Text>
      <Highlight>«Høl i CVen»</Highlight> er et prosjekt i Bærum kommune som har fokus på Recovery der vi tenker tilhørighet, nettverk og jobb er en del av en tilfriskningsprosess. Vi bestemte oss for å åpne en kaffevogn som til vanlig står ved lekeplassen nederst i Rådmann Halmrastsvei i Sandvika. Det er et prosjekt startet av ansatte og beboere i psykisk helse og rus. Medarbeiderne får god opplæring i kaffetilberedning og fra vognen serveres og selges det et godt utvalg av kaffe og espressobaserte drikker. Målet er å gi mennesker en mulighet til å få arbeidserfaring samtidig som de selger produkter med høy publikumsinteresse og kvalitet. Vi har nå kvittet oss med vognen å kjøpt oss en Foodtruck, så vi lettere kan delta på ulike arrangementer.
    </Text>
  </AboutWrapper>
);

export default AboutSection;
