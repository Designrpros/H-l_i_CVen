import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const ProductsWidget = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const newProducts = snapshot.docs.map(doc => doc.data());
      setProducts(newProducts);
    });

    return () => unsubscribe();
  }, []);

  // Example: Display products with low inventory
  const lowInventoryProducts = products.filter(product => product.inventoryLevel < 10);

  return (
    <div>
      <h4>Low Inventory Products</h4>
      {lowInventoryProducts.map(product => (
        <div key={product.productId}>{product.name} - {product.inventoryLevel} left</div>
      ))}
    </div>
  );
};

export default ProductsWidget;
