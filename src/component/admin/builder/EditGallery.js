import React from 'react';
import { useGallery } from '../../../context/GalleryContext';
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Button, Box, CircularProgress, IconButton, styled } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100px',
  height: '100px',
  '&:hover': {
    opacity: 0.8,
  },
  '& .deleteIcon': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.error.main,
  },
}));

const EditGallery = () => {
  const { images, updateGallery } = useGallery();

  const handleImageUpload = async (e) => {
    Array.from(e.target.files).forEach(file => {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newImage = { src: downloadURL, alt: file.name };
            const updatedImages = [...images, newImage];
            updateGallery(updatedImages);
          });
        }
      );
    });
  };

  const handleDeleteImage = async (image, index) => {
    const imageRef = ref(storage, image.src);
    await deleteObject(imageRef);
    const updatedImages = images.filter((_, i) => i !== index);
    updateGallery(updatedImages);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" component="label" startIcon={<AddPhotoAlternateIcon />}>
        Upload Images
        <input type="file" hidden multiple onChange={handleImageUpload} />
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {images.length === 0 ? (
          <CircularProgress />
        ) : (
          images.map((image, index) => (
            <ImageBox key={index}>
              <img src={image.src} alt={image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <IconButton className="deleteIcon" size="small" onClick={() => handleDeleteImage(image, index)}>
                <DeleteIcon />
              </IconButton>
            </ImageBox>
          ))
        )}
      </Box>
    </Box>
  );
};

export default EditGallery;
