import React from 'react';
import styled from 'styled-components';
import { useHeroSection } from '../context/HeroSectionContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const HeroWrapper = styled.div`
  background-color: #fff;
  height: 100vh; // Set the height to fill the viewport
  display: flex;
  flex-direction: column;
  justify-content: center; // Center content vertically
  align-items: center;
  text-align: center;
`;

const Logo = styled.img`
  height: 200px;
  margin-bottom: 20px;
`;

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4500,
};

const ImageSlider = styled(Slider)`
  width: 100%;
  max-width: 600px; // Limit the width of the slider

  .slick-slide img {
    width: 100%;
    height: auto;
  }
`;

const HeroSection = () => {
  const { heroContent } = useHeroSection();
  const { logoUrl, headline, sliderImages } = heroContent;

  return (
    <HeroWrapper id="home">
      <Logo src={logoUrl} alt="Logo" />
      <h4>{headline}</h4>
      <ImageSlider {...sliderSettings}>
        {sliderImages.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} />
        ))}
      </ImageSlider>
    </HeroWrapper>
  );
};

export default HeroSection;
