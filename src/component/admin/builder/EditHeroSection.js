import React, { useState } from 'react';
import { useHeroSection } from '../../../context/HeroSectionContext';
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig'; // Adjust the path as necessary
import styled from 'styled-components';
import { TextField, Button, Grid, Snackbar, IconButton, Paper } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteObject } from "firebase/storage";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
  }
`;

const EditHeroSection = () => {
  const { heroContent, setHeroContent } = useHeroSection();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const updateHeadline = (e) => {
    setHeroContent({ ...heroContent, headline: e.target.value });
  };

  const handleImageUpload = async (e, imageKey) => {
    const files = e.target.files;
    const uploadedImages = await Promise.all(Array.from(files).map(async (file) => {
      const storageRef = ref(storage, `heroSection/${imageKey}/${file.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(uploadTaskSnapshot.ref);
    }));
  
    // Now, uploadedImages is defined and can be used here
    setHeroContent(prev => {
      const updatedContent = {
        ...prev,
        [imageKey]: imageKey === 'sliderImages' ? [...prev[imageKey], ...uploadedImages] : uploadedImages[0],
      };
  
      // Save the updated content to Firestore
      saveHeroContentToFirestore(updatedContent);
  
      return updatedContent;
    });
  
    setOpenSnackbar(true);
  };
  
  const saveHeroContentToFirestore = async (updatedContent) => {
    try {
      // Assuming "heroSection/content" is the path to your document
      // and "updatedContent" is the new content to save
      await setDoc(doc(db, "heroSection", "content"), updatedContent);
      console.log("Hero content updated successfully in Firestore.");
    } catch (error) {
      console.error("Error updating hero content in Firestore:", error);
      // Optionally, set an error state here to give feedback to the user
    }
  };
  
  // Define handleCloseSnackbar here
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return; // Prevents the snackbar from closing when the user clicks away
    }
    setOpenSnackbar(false);
  };

  const handleDeleteImage = (imageIndex) => {
    // Get the URL of the image to delete
    const imageUrl = heroContent.sliderImages[imageIndex];
    const filteredImages = heroContent.sliderImages.filter((_, index) => index !== imageIndex);
    setHeroContent(prev => {
      const updatedContent = {
        ...prev,
        sliderImages: filteredImages,
      };
  
      // Save the updated content to Firestore
      saveHeroContentToFirestore(updatedContent);
  
      // Delete the image from Firebase Storage
      deleteImageFromStorage(imageUrl);

      return updatedContent;
    });
  };

  const deleteImageFromStorage = async (imageUrl) => {
    // Create a reference to the file to delete
    const imageRef = ref(storage, imageUrl);
  
    // Delete the file
    deleteObject(imageRef).then(() => {
      console.log("File deleted successfully from Firebase Storage.");
    }).catch((error) => {
      console.error("Error deleting file from Firebase Storage:", error);
    });
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Headline"
          variant="outlined"
          value={heroContent.headline}
          onChange={updateHeadline}
          fullWidth
        />
      </Grid>
      <Grid item>
        <Button variant="contained" component="label">
          Upload Logo
          <input type="file" hidden onChange={(e) => handleImageUpload(e, 'logoUrl')} />
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" component="label" startIcon={<AddPhotoAlternateIcon />}>
          Upload Slider Images
          <input type="file" hidden multiple onChange={(e) => handleImageUpload(e, 'sliderImages')} />
        </Button>
      </Grid>
      <Grid item xs={12}>
      <ImagePreviewContainer>
        {heroContent.sliderImages.map((image, index) => (
          <ImagePreview key={index}>
            <img src={image} alt={`Slider ${index}`} />
            <IconButton className="delete-icon" size="small" onClick={() => handleDeleteImage(index)}>
              <DeleteIcon />
            </IconButton>
          </ImagePreview>
        ))}
      </ImagePreviewContainer>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Image uploaded successfully"
      />
    </Grid>
  );
};

export default EditHeroSection;
