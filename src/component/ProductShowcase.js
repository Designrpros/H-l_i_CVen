import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import coffeeImage from './img/coffee.webp'; // Adjust the path as necessary

const products = [
  { id: '1', name: 'Bourbon Espresso', description: 'Rich and full-bodied, with notes of dark chocolate and caramel.', image: coffeeImage },
  { id: '2', name: 'Arabica Light Roast', description: 'Floral and citrusy, perfect for a refreshing morning cup.', image: coffeeImage },
  { id: '3', name: 'Robusta Dark Roast', description: 'Bold and robust, with a hint of chocolate and a smooth finish.', image: coffeeImage },
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
    align-items: flex-start;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px; // Limit the height on large screens
  width: auto;
  height: auto;
  border-radius: 8px;
  object-fit: cover; // Ensure the image covers the area nicely

  @media (min-width: 768px) {
    max-width: 50%; // Take up to half the container width on large screens
  }
`;

const ProductContent = styled.div`
  @media (min-width: 768px) {
    max-width: 50%;
    padding-left: 20px; // Add some space between the image and the text content
  }
`;


const ProductName = styled.h2`
  color: #333;
`;

const ProductDescription = styled.p`
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
    return <div>Loading...</div>;
  }

  return (
    <ShowcaseContainer>
      <ProductImage src={product.image} alt={product.name} />
      <ProductContent>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
      </ProductContent>
    </ShowcaseContainer>
  );
};


export default ProductShowcase;
