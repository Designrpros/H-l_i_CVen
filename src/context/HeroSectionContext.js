// src/context/HeroSectionContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig'; // Adjust the import path as necessary
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const HeroSectionContext = createContext();

export const useHeroSection = () => useContext(HeroSectionContext);

export const HeroSectionProvider = ({ children }) => {
  const [heroContent, setHeroContentState] = useState({ logoUrl: '', headline: '', sliderImages: [] });

  const setHeroContent = (content) => {
    setHeroContentState(content);
    // Additional logic to save to Firestore could also be here if needed
  };

  useEffect(() => {
    // Fetch initial hero content from Firestore
    const fetchHeroContent = async () => {
      console.log("Fetching hero content from Firestore");
      const docRef = doc(db, "heroSection", "content");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Fetched hero content:", docSnap.data());
        setHeroContent(docSnap.data());
      } else {
        console.log("No hero section content found");
      }
    };

    fetchHeroContent();
  }, []);

  const saveHeroContent = async (content) => {
    console.log("Attempting to save:", content); // This should log an object, not a function
    try {
      await setDoc(doc(db, "heroSection", "content"), content);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error saving hero content:", error);
    }
  };
  

  return (
    <HeroSectionContext.Provider value={{ heroContent, setHeroContent }}>
      {children}
    </HeroSectionContext.Provider>
  );
};

