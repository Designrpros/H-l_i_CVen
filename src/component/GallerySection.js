import React from 'react';
import styled from 'styled-components';
import { useGallery } from '../context/GalleryContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const GallerySection = () => {
  const { images } = useGallery();

  // Ensure images is always an array
  const safeImages = images || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of slides to show
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // At 1024px or below, show 3 slides
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // At 768px or below, show 2 slides
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // At 480px or below, show 1 slide
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <GalleryContainer id="gallery">
      <Slider {...settings}>
        {safeImages.map((image, index) => (
          <div key={index}>
            <GalleryImage src={image.src} alt={image.alt} />
          </div>
        ))}
      </Slider>
    </GalleryContainer>
  );
};


const GalleryContainer = styled.div`
  padding: 20px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
`;

export default GallerySection;
