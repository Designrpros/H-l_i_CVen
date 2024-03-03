import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import logoImage from './img/HØL_I_CVEN_GRØNN.png'; // Ensure the path is correct

// Importing all images for the slider
import image2 from './img/Truck.webp';
import image3 from './img/alle.webp';
import image4 from './img/Erna.webp';

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
  return (
    <HeroWrapper id="home">
      <Logo src={logoImage} alt="HØL I CVEN" />
      <h4>Knallgod kaffe med mening</h4>
      <ImageSlider {...sliderSettings}>
        <img src={image2} alt="Truck" />
        <img src={image3} alt="Erna" />
        <img src={image4} alt="Erna" />
      </ImageSlider>
    </HeroWrapper>
  );
};

export default HeroSection;