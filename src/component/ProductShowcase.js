import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import path as necessary


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
  const { addToCart } = useCart(); // This line must be at the top level, not inside any conditional or function

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", productId); // Create a reference to the product document
      const docSnap = await getDoc(docRef); // Fetch the document
  
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() }); // Set the product state with the fetched data
      } else {
        console.log("No such document!");
      }
    };
  
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ShowcaseContainer>
      <ProductImage src={product.image ? product.image : `${process.env.PUBLIC_URL}/images/holicvenlogo.png`} alt={product.name} />
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
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </ShowcaseContainer>
  );
};

export default ProductShowcase;