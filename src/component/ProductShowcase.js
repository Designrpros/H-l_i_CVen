import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import coffeeImage from './img/coffee.webp'; // Adjust the path as necessary

const products = [
  {
    id: '1',
    name: 'Sidamo Organic',
    description: 'Frisk og fruktig, rik og fyldig. Kompleks med godt balansert syrlighet, hint av aprikos og bergamott.',
    price: 'kr. 250,00/2,2L (kr. 20,00/kopp)',
    origin: 'Ethiopia',
    altitude: '1700-1800moh',
    process: 'Vasket og soltørket',
    tasteNotes: 'Aprikos, bergamott',
    image: coffeeImage,
  },
  {
    id: '2',
    name: 'Finca Las Nubes',
    description: 'Ren og godt balansert med klassisk smak, fin sødme og friskhet.',
    price: 'kr. 350/2,2L (kr. 29,00/kopp)',
    origin: 'Guatemala',
    altitude: '1.500m',
    process: 'Fully washed and dried on patios',
    tasteNotes: 'Klassisk smak, fin sødme, friskhet',
    image: coffeeImage,
  },
  {
    id: '3',
    name: 'Guadalupe Zaju Bourbon Barrel Aged',
    description: 'Unik, kompleks og dypt tilfredsstillende. Lagret på whiskyfat.',
    price: 'kr. 450,00/2,2L (kr. 37,00/kopp)',
    origin: 'Mexico',
    altitude: '900 - 1,400 meter over havet',
    process: 'Vasket & tørket på guardiolas',
    tasteNotes: 'Sherry, espresso martini, vanilla',
    image: coffeeImage,
  },
  { id: '4', name: 'Colombian Medium Roast', description: 'Smooth and creamy, with a balanced flavor of nuts and fruits.', image: coffeeImage },
  { id: '5', name: 'Ethiopian Natural', description: 'Fruity and winey, with bright acidity and a complex flavor profile.', image: coffeeImage },
  { id: '6', name: 'Sumatra Mandheling', description: 'Earthy and spicy, with a full body and a rich, lingering aftertaste.', image: coffeeImage },
];


const ShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 20px;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center; /* This ensures vertical centering */
    justify-content: center;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  align-self: center; /* Center the image vertically within its flex container */

  @media (min-width: 768px) {
    max-width: 40%;
  }
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  width: 100%;
  align-self: center; /* Center the content vertically within its flex container */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 60%;
    padding-left: 20px;
  }
`;


const ProductName = styled.h2`
  color: #333;
  grid-column: 1 / -1; // Spans all columns
`;

const ProductDescription = styled.p`
  color: #666;
  grid-column: 1 / -1; // Spans all columns
`;

const ProductPrice = styled.p`
  color: #333;
  font-weight: bold;
  grid-column: 1 / -1; // Spans all columns
`;

const CoffeeDetail = styled.div`
  display: contents; // Allows children to directly participate in the grid layout
`;

const DetailHeading = styled.h3`
  color: #333;
  margin: 0;
`;

const DetailText = styled.p`
  color: #666;
`;

const ProductShowcase = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productDetails = products.find(product => product.id === productId);
    setProduct(productDetails);
  }, [productId]);

  if (!product) {
    return <div>Laster...</div>;
  }

  return (
    <ShowcaseContainer>
      <ProductImage src={product.image} alt={product.name} />
      <ProductContent>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>{product.price}</ProductPrice>
        <CoffeeDetail>
          <DetailHeading>Opprinnelse:</DetailHeading>
          <DetailText>{product.origin}</DetailText>
        </CoffeeDetail>
        <CoffeeDetail>
          <DetailHeading>Høyde:</DetailHeading>
          <DetailText>{product.altitude}</DetailText>
        </CoffeeDetail>
        <CoffeeDetail>
          <DetailHeading>Prosess:</DetailHeading>
          <DetailText>{product.process}</DetailText>
        </CoffeeDetail>
        <CoffeeDetail>
          <DetailHeading>Smaksnotater:</DetailHeading>
          <DetailText>{product.tasteNotes}</DetailText>
        </CoffeeDetail>
      </ProductContent>
    </ShowcaseContainer>
  );
};

export default ProductShowcase;