import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 20px;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 700px;
  border-radius: 8px;
  object-fit: cover;

  @media (min-width: 768px) {
    max-width: 40%;
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 60%;
    padding-left: 20px;
  }
`;

const ProductName = styled.h1`
  color: #333;
`;

const ProductDescription = styled.p`
  color: #666;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ProductPrice = styled.p`
  color: #333;
  font-weight: bold;
  font-size: 1.5rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const CategoryTag = styled.div`
  background-color: #e0e0e0; /* Light grey */
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  margin: 10px 0; /* Add some margin to separate it from other elements */
`;

const CoffeeDetail = styled.div`
  background: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const DetailHeading = styled.h3`
  color: #333;
  margin: 0 0 5px 0;
`;

const DetailText = styled.p`
  color: #666;
`;

const Alert = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 1000; // Ensure it's above other content
`;


const ProductShowcase = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Assuming useCart provides addToCart
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart({ ...product, quantity });
      setAlertMessage(`${product.name} has been added to your cart.`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
    }
  };
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ShowcaseContainer>
      <Alert show={showAlert}>{alertMessage}</Alert>
      <ProductImage src={product.image || `${process.env.PUBLIC_URL}/images/holicvenlogo.png`} alt={product.name} />
      <ProductContent>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        {product.category && <CategoryTag>{product.category}</CategoryTag>}
        <PriceContainer>
          <ProductPrice>{product.price} NOK</ProductPrice>
          <QuantityInput
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            min="1"
          />
          <AddToCartButton onClick={handleAddToCart}>Legg i handlekurv</AddToCartButton>
        </PriceContainer>
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
        </CoffeeDetail>    </ProductContent>
    </ShowcaseContainer>
  );
};

export default ProductShowcase;
