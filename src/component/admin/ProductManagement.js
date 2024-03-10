import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, storage } from '../../firebaseConfig'; // Ensure storage is correctly imported
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary functions for handling file uploads
import SimpleModal from './SimpleModal';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Not favorite
import FavoriteIcon from '@mui/icons-material/Favorite'; // Favorite

const FavoriteButton = styled.button`
  position: absolute; /* Position the button absolutely within ProductCard */
  top: 0; /* Align to the top of ProductCard */
  right: 0; /* Align to the right of ProductCard */
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px; /* Add some padding for easier clicking */
  z-index: 10; /* Ensure the button is above other content */
`;

const AdminContainer = styled.div`
  padding: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  position: relative; /* Establish a positioning context for absolute positioning */
  text-align: center;
  border: 2px solid;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 15px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
  }
  img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
  }
`;

const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 12px 20px; // Increased padding for a larger appearance
  width: 100%; // Make the button fill the width of its container
  border: none;
  background-color: #4a90e2; // A more subtle blue color
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px; // Larger font size for better readability
  margin-top: 10px; // Add some space above the button

  &:hover {
    background-color: #417cb8; // Slightly darker shade on hover
  }
`;


const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    origin: '',
    category: '',
    altitude: '',
    process: '',
    tasteNotes: '',
    image: '',
    favorite: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Existing useEffect and fetchProducts function

  const startEditProduct = async (productId) => {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProductForm({ ...docSnap.data(), image: docSnap.data().image || '' });
      setEditMode(true);
      setEditingProductId(productId);
      setIsModalOpen(true);
    } else {
      console.log("No such document!");
    }
  };

  const handleAddOrEditProduct = async (event) => {
    event.preventDefault();
  
    if (editMode) {
      // Update existing product
      const docRef = doc(db, "products", editingProductId);
      await updateDoc(docRef, productForm);
      // Optionally, update the local state to reflect the edit without refetching all products
      setProducts(products.map(product => product.id === editingProductId ? { id: editingProductId, ...productForm } : product));
    } else {
      // Add new product
      const docRef = await addDoc(collection(db, "products"), productForm);
      // Append the new product at the end of the products array in the state
      const newProduct = { id: docRef.id, ...productForm };
      setProducts([...products, newProduct]);
    }
  
    // Reset form and close modal
    setIsModalOpen(false);
    setProductForm({
      name: '',
      description: '',
      price: '',
      origin: '',
      category: '',
      altitude: '',
      process: '',
      tasteNotes: '',
      image: ''
    });
    setEditMode(false);
    setEditingProductId(null);
  };
  
  
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", productId));
      fetchProducts(); // Refresh the products list after deletion
    }
  };
  
    // Use useEffect to call fetchProducts when the component mounts
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setProductForm(prev => ({ ...prev, [name]: value }));
    };
  
    const handleImageChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const fileRef = ref(storage, `products/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      setProductForm(prev => ({ ...prev, image: imageUrl }));
    };
  
    const handleAddProduct = async (event) => {
      event.preventDefault();
      try {
        const docRef = await addDoc(collection(db, "products"), productForm);
        const newProduct = { id: docRef.id, ...productForm };
        // Append the new product at the end of the products array
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    
        setIsModalOpen(false); // Close the modal
        setProductForm({ // Reset the form to empty
          name: '',
          description: '',
          price: '',
          origin: '',
          category: '',
          altitude: '',
          process: '',
          tasteNotes: '',
          image: ''
        });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

    // Toggle favorite status function
    const toggleFavorite = async (id, currentStatus) => {
      await updateDoc(doc(db, "products", id), {
        favorite: !currentStatus,
      });
      fetchProducts(); // Re-fetch products to reflect the change
    };
    

  return (
    <AdminContainer>
      <Toolbar>
        <Button onClick={() => {
          setEditMode(false);
          setProductForm({
            name: '',
            description: '',
            price: '',
            origin: '',
            category: '',
            altitude: '',
            process: '',
            tasteNotes: '',
            image: ''
          });
          setIsModalOpen(true);
        }}>Add Product</Button>
      </Toolbar>
      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ProductForm onSubmit={handleAddProduct}>
        <Input name="name" value={productForm.name} onChange={handleChange} placeholder="Name" required />
        <Input name="description" value={productForm.description} onChange={handleChange} placeholder="Description" required />
        <Input name="price" value={productForm.price} onChange={handleChange} placeholder="Price" type="number" required />
        <Input name="origin" value={productForm.origin} onChange={handleChange} placeholder="Origin" required />
        <Input name="category" value={productForm.category} onChange={handleChange} placeholder="Category" required />
        <Input name="altitude" value={productForm.altitude} onChange={handleChange} placeholder="Altitude" required />
        <Input name="process" value={productForm.process} onChange={handleChange} placeholder="Process" required />
        <Input name="tasteNotes" value={productForm.tasteNotes} onChange={handleChange} placeholder="Taste Notes" required />
        <Input type="file" onChange={handleImageChange} />
        <Button type="submit">Add Product</Button>
        </ProductForm>
      </SimpleModal>
      <ProductsContainer>
        {products.map((product) => ( // Ensure you're using 'product' from the map function
          <ProductCard key={product.id} onContextMenu={(e) => {
            e.preventDefault();
            const action = prompt("Type 'delete' to delete or 'edit' to edit this product:");
            if (action === 'delete') {
              handleDeleteProduct(product.id);
            } else if (action === 'edit') {
              startEditProduct(product.id);
            }
          }}>
            <img src={product.image || `${process.env.PUBLIC_URL}/images/holicvenlogo.png`} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <FavoriteButton onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the context menu
              toggleFavorite(product.id, product.favorite); // Access 'favorite' directly from 'product'
            }}>
              {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </FavoriteButton>
          </ProductCard>
        ))}
      </ProductsContainer>
    </AdminContainer>
  );
};

export default ProductManagement;