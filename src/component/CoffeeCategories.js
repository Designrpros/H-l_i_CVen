import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useDescriptionBox } from '../context/DescriptionBoxContext'; // Adjust the import path as necessary
import world from './img/world.png';

const Icon = styled.img`
  width: 150px; /* Adjust size as needed */
  height: auto;
`;


const Title = styled.h2`
  color: #333; /* Darker shade for better contrast */
  font-size: 2rem; /* Larger font size */
  margin: 40px; /* More space below the title */
  font-family: 'Courier New', Courier, monospace; /* Keeping the retro theme */
  text-transform: uppercase; /* Optional: Makes the title stand out more */
`;

const CategoriesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjust min card width as needed */
  gap: 20px;
  justify-content: center;
  align-items: stretch;
  padding: 0 20px; /* Add some padding on the sides if needed */
`;


const SectionWrapper = styled.section`
  padding: 20px; /* Increased vertical padding */
  text-align: center;
  background-color: #f5f5f5;
`;

const ProductCard = styled.div`
  border: 2px solid; /* Soft, vintage border color */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  overflow: hidden; /* Ensures the image doesn't bleed outside the border-radius */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effects */
  margin: 15px; /* Added to give more space around each card */
  &:hover {
    transform: translateY(-5px); /* Slight lift effect on hover */
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover for more depth */
  }
  img {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
    max-height: 200px; /* Adjust based on your preference */
    object-fit: cover; /* Ensures the image covers the area nicely */
  }
  .card-content {
    padding: 20px; /* Increased padding for text content */
  }
  .card-title, .card-description {
    margin: 10px 0; /* Adjusted spacing */
  }
  .card-title {
    font-size: 1.4rem; /* Slightly larger font size for titles */
  }
  .card-description {
    font-size: 1rem; /* Adjusted for readability */
  }
`;


const DescriptionBox = styled.div`
  margin: 20px auto; /* Centers the box and adds space above and below */
  padding: 20px;
  max-width: 90%; /* Adjust based on your layout preference */
  border: 2px solid; /* Matches the ProductCard border color for consistency */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  position: relative; /* Needed for absolute positioning of the icon */
  color: #333; /* Text color */
  font-size: 0.9rem; /* Adjust based on your preference */
  text-align: left; /* Aligns text to the left */
  line-height: 1.6; /* Improves readability */
`;


const DynamicParagraph = styled.p`
  text-align: ${({ alignment }) => alignment || 'left'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ color }) => color || '#333'};
  padding: ${({ padding }) => `0 ${padding}px`};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; // Adjust the gap as needed
  margin-top: 20px;
`;

const CoffeeCategories = () => {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { descriptionContent } = useDescriptionBox(); // Use the context

      useEffect(() => {
        const fetchFavoriteProducts = async () => {
          const querySnapshot = await getDocs(collection(db, "products"));
          const productsArray = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(product => product.favorite); // Filter for favorite products
          setProducts(productsArray);
        };

        fetchFavoriteProducts();
      }, []);


  const displayedProducts = products //.slice(0, 3); // Adjust this line if you need specific filtering

  return (
    <SectionWrapper id="sustainable-coffee">
      <Title>BÆREDYKTIG KAFFE</Title>
      <DescriptionBox>
        {descriptionContent.elements.map((element, index) => {
          switch (element.type) {
            case 'paragraph':
              return (
                <DynamicParagraph
                  key={index}
                  alignment={element.alignment}
                  bold={element.bold}
                  color={element.color}
                  padding={element.padding}
                >
                  {element.text}
                </DynamicParagraph>
              );
            // Handle other types (h1, h2, h3) similarly
            default:
              return null;
          }
        })}
        <IconContainer>
          <Icon src={world} alt="world" />
        </IconContainer>
      </DescriptionBox>

      <Title>Utvalgte Produkter</Title>
      <CategoriesWrapper>
        {displayedProducts.map(({ id, name, description, image }) => (
          <ProductCard key={id} onClick={() => navigate(`/product/${id}`)}>
            <img src={image || `${process.env.PUBLIC_URL}/images/holicvenlogo.png`} alt={name} />
            <div className="card-content">
              <h3 className="card-title">{name}</h3>
              <p className="card-description">{description}</p>
            </div>
          </ProductCard>
        ))}
      </CategoriesWrapper>
    </SectionWrapper>
  );
};

export default CoffeeCategories;