import React, { useState } from 'react';
import styled from 'styled-components';
import products from '../data/products';
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
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    setFilteredProducts(products.filter(product => value === 'all' || product[type] === value));
  };

  return (
    <Wrapper>
      <ProductHeader>
        <h2>Våre Produkter</h2>
      </ProductHeader>
      <FiltersContainer>
        <FilterSelect onChange={(e) => handleFilterChange(e, 'category')}>
          <option value="all">Alle kategorier</option>
          {Array.from(new Set(products.map(product => product.category)))
            .map(category => <option key={category} value={category}>{category}</option>)}
        </FilterSelect>
        <FilterSelect onChange={(e) => handleFilterChange(e, 'origin')}>
          <option value="all">Alle land</option>
          {Array.from(new Set(products.map(product => product.origin)))
            .map(origin => <option key={origin} value={origin}>{origin}</option>)}
        </FilterSelect>
      </FiltersContainer>
      <Grid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} onClick={() => handleProductClick(product.id)}>
            <img src={`${process.env.PUBLIC_URL}/images/${product.image}`} alt={product.name} />
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
