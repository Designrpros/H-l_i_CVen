import React from 'react';
import styled from 'styled-components';

import RapClinicImage from './img/color_logo_transparent_Studio_51_Rap_Clinic.png';
import VikandaImage from './img/BærumArbeidssenter.png';
import DGBImage from './img/dengyil.png';

const partners = [
  { name: 'Rap Clinic', url: 'https://rapclinic.no/', img: RapClinicImage },
  { name: 'Vikanda', url: 'https://vikanda.no/', img: VikandaImage },
  { name: 'Den Gyldne Bønne', url: 'https://www.dgb.no/', img: DGBImage },
];

const CooperationSectionWrapper = styled.section`
  text-align: center;
  padding: 40px 20px;
`;

const PartnerCard = styled.div`
  display: inline-flex; // Changed to inline-flex to keep cards inline but allow internal flex-direction control
  flex-direction: column; // Aligns items in a column, so the image is above the text/button
  align-items: center; // Centers the items horizontally in the card
  margin: 20px;
  text-align: center;
`;

const PartnerImage = styled.img`
  width: 100px; // Adjust based on your needs
  height: auto;
  margin-bottom: 10px; // Creates space between the image and the button
`;

const VisitLink = styled.a`
  display: block; // Ensures the link takes the full width of its container, making it easier to click/tap
  background-color: #9dd2ac; // Updated to your specified color
  color: #ffffff;
  padding: 10px 20px;
  border: none; // Removes any default border styling
  text-decoration: none;
  font-weight: bold;
  width: fit-content; // Ensures the button size fits its content
  margin: 0 auto; // Centers the button since its display is now block
`;


const CooperationSection = () => {
  return (
    <CooperationSectionWrapper>
      <h2>Samarbeids Partnere</h2>
      {partners.map((partner, index) => (
        <PartnerCard key={index}>
          <PartnerImage src={partner.img} alt={partner.name} />
          <VisitLink href={partner.url} target="_blank" rel="noopener noreferrer">Besøk</VisitLink>
        </PartnerCard>
      ))}
    </CooperationSectionWrapper>
  );
};

export default CooperationSection;
