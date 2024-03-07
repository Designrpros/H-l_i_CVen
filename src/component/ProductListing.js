import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig'; // Adjust the import path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  margin-top: 50px;
`;
const ProductHeader = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
text-align: center;
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
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-width: 120px; // Ensures the select boxes don't become too small on mobile devices
`;

const ProductListing = () => {
  const [filters, setFilters] = useState({ category: 'all', origin: 'all' });
  const [filteredProducts, setFilteredProducts] = useState([]); // Define the state for filtered products
  const navigate = useNavigate();

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    setFilters(prevFilters => ({ ...prevFilters, [type]: value }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      let productsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      // Sort products by createdAt timestamp
      productsArray.sort((a, b) => {
        const aCreatedAt = a.createdAt ? new Date(a.createdAt.seconds * 1000) : new Date();
        const bCreatedAt = b.createdAt ? new Date(b.createdAt.seconds * 1000) : new Date();
        return aCreatedAt - bCreatedAt;
      });
  
      // Apply filters
      const filtered = productsArray.filter(product => {
        return (filters.category === 'all' || product.category === filters.category) &&
               (filters.origin === 'all' || product.origin === filters.origin);
      });
  
      setFilteredProducts(filtered); // Update the filteredProducts state
    };
  
    fetchProducts();
  }, [filters]); // Re-fetch products when filters change
  

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Wrapper>
      <ProductHeader>
        <h2>Våre Produkter</h2>
      </ProductHeader>
      <FiltersContainer>
        <FilterSelect onChange={(e) => handleFilterChange(e, 'category')}>
          <option value="all">Alle kategorier</option>
          {Array.from(new Set(filteredProducts.map(product => product.category)))
            .map(category => <option key={category} value={category}>{category}</option>)}
        </FilterSelect>
        <FilterSelect onChange={(e) => handleFilterChange(e, 'origin')}>
          <option value="all">Alle land</option>
          {Array.from(new Set(filteredProducts.map(product => product.origin)))
            .map(origin => <option key={origin} value={origin}>{origin}</option>)}
        </FilterSelect>
      </FiltersContainer>
      <Grid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} onClick={() => handleProductClick(product.id)}>
            <img src={product.image || `${process.env.PUBLIC_URL}/images/holicvenlogo.png`} alt={product.name} />
            <div className="content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          </ProductCard>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ProductListing;
