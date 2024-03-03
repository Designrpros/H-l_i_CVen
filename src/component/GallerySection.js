import React from 'react';
import styled from 'styled-components';
import TruckAgain from './img/Truckagain.webp';
import MangeBilder from './img/Mange_bilder.webp';
import CoffeeCup from './img/coffee_cup.webp';

const images = [
  { src: TruckAgain, alt: 'Truck again' },
  { src: MangeBilder, alt: 'Mange bilder' },
  { src: CoffeeCup, alt: 'Coffee cup' },
];


const GallerySection = () => {
  return (
    <GalleryContainer>
      {images.map((image, index) => (
        <GalleryImage key={index} src={image.src} alt={image.alt} />
      ))}
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
  padding: 20px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
`;

export default GallerySection;
