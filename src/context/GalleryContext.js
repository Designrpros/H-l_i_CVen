// src/context/GalleryContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const GalleryContext = createContext();

export const useGallery = () => useContext(GalleryContext);

export const GalleryProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const docRef = doc(db, "gallery", "yourGalleryDocId");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImages(docSnap.data().images);
      } else {
        console.log("No such document!");
      }
    };

    fetchImages();
  }, []);

  const updateGallery = async (newImages) => {
    const galleryDocRef = doc(db, "gallery", "yourGalleryDocId");
    await updateDoc(galleryDocRef, { images: newImages });
    setImages(newImages);
  };

  return (
    <GalleryContext.Provider value={{ images, updateGallery }}>
      {children}
    </GalleryContext.Provider>
  );
};
