import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

import coffeeImage from './img/coffee.webp'; // Adjust the import path as necessary
import Brazil from './img/Brazil.png'; // Placeholder path, replace with your actual icon
import Colombia from './img/Colombia.png';

const Icon = styled.img`
  width: 50px; /* Adjust size as needed */
  height: auto;
  margin-bottom: 10px; /* Space between icon and text */
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

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; // Adjust the gap as needed
  margin-bottom: 20px;
`;

const products = [
  {
    id: 1,
    name: 'Bourbon Espresso',
    description: 'Rich and full-bodied, with notes of dark chocolate and caramel.',
    image: coffeeImage, // Update path as necessary
  },
  {
    id: 2,
    name: 'Arabica Light Roast',
    description: 'Floral and citrusy, perfect for a refreshing morning cup.',
    image: coffeeImage, // Update path as necessary
  },
  {
    id: 3,
    name: 'Robusta Dark Roast',
    description: 'Bold and robust, with a hint of chocolate and a smooth finish.',
    image: coffeeImage, // Update path as necessary
  },
  {
    id: 4,
    name: 'Colombian Medium Roast',
    description: 'Smooth and creamy, with a balanced flavor of nuts and fruits.',
    image: coffeeImage, // Update path as necessary
  },
  {
    id: 5,
    name: 'Ethiopian Natural',
    description: 'Fruity and winey, with bright acidity and a complex flavor profile.',
    image: coffeeImage, // Update path as necessary
  },
  {
    id: 6,
    name: 'Sumatra Mandheling',
    description: 'Earthy and spicy, with a full body and a rich, lingering aftertaste.',
    image: coffeeImage, // Update path as necessary
  },
  // Add more products as needed
];

const CoffeeCategories = () => {
  let navigate = useNavigate(); // Use the useNavigate hook for navigation

  const navigateToProductShowcase = (productId) => {
    console.log(`Navigating to product with ID: ${productId}`); // Debugging line
    navigate(`/product/${productId}`); // Navigate to the ProductShowcase page with the product ID
  };
    
  return (
    <SectionWrapper id="sustainable-coffee">
      <Title>BÆREDYKTIG KAFFE</Title>
      {/* DescriptionBox and its content remain unchanged */}
      <DescriptionBox>
      <p>Som sin kaffeleverandør har Høl i CVen valgt Den Gyldne Bønne as, et lokalt foretak som i snart 25 år har importert, brent og solgt kaffe til folk og bedrifter.</p>
      <p>Den Gyldne Bønne as markedsfører nybrente kaffespesialiteter fra hele verden og råvarene er et representativt utvalg av spesialiteter og variasjoner fra de fleste kaffeproduserende land. Kaffen foredles håndverksmessig i eget brenneri på Vøyenenga i Bærum.</p>
      <p>Vi påstår at kunnskap og kvalitet er veien til et bedre liv uansett bransje og hvor enn man er i verden. Kvalitet koster heller ikke så mye mer og verdsettes i stor grad av opplyste forbrukere. At bedre kaffe er til å betale for de aller fleste, kan illustreres ved at kaffekostnaden i en kopp med verdens dyreste kaffe utgjør omtrent kr. 25,00. Altså ikke mer enn en flaske vann på bensinstasjonen!</p>
      <p>Vi som vet hvilket arbeid som ligger bak en god kopp kaffe, helt fra bonden i f.eks. Colombia til den serveres i Høl i CVens kaffevogn i Sandvika, mener at de fleste både har råd til og fortjener en riktig god kopp kaffe.</p>
      <p>Det er riktig og rettferdig å betale godt for god kvalitet, og det er mer konstruktivt og langsiktig enn å drive veldedighet. Vi arbeider hver dag for å heve interessen for kvaliteten på produktene som vi er så glade i og kanskje aldri så lite avhengige av.</p>
      <p>Den Gyldne Bønne as samarbeider med Høl i CVen, og foruten å levere kaffen, bistår vi med vederlagsfri opplæring av deltakerne i programmet.</p>
      <p>Med hilsen, Jørgen Lindvik, Daglig leder Den Gyldne Bønne AS.</p>
      <IconContainer>
          <Icon src={Colombia} alt="Colombia" />
          <Icon src={Brazil} alt="Brazil" />
        </IconContainer>
      </DescriptionBox>

      <Title>Våre Produkter</Title>
      <CategoriesWrapper>
        {products.map(({ id, name, description, image }) => (
          <ProductCard key={id} onClick={() => navigateToProductShowcase(id)}> {/* Add onClick event */}
            <img src={image} alt={name} />
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