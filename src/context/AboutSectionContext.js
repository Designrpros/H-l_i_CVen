// src/context/AboutSectionContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Adjust the import path as necessary
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AboutSectionContext = createContext();

export const useAboutSection = () => useContext(AboutSectionContext);

export { AboutSectionContext };

export const AboutSectionProvider = ({ children }) => {
  const [aboutContent, setAboutContent] = useState({
    heading: '',
    sections: [{ text: '', highlight: '' }],
  });

  useEffect(() => {
    const fetchAboutContent = async () => {
      const docRef = doc(db, "aboutSection", "content");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log("Fetched about section content:", docSnap.data());
        setAboutContent(docSnap.data());
      } else {
        console.log("No about section content found");
      }
    };
  
    fetchAboutContent();
  }, []);
  

  const saveAboutContent = async (content) => {
    await setDoc(doc(db, "aboutSection", "content"), content);
    setAboutContent(content);
  };

  return (
    <AboutSectionContext.Provider value={{ aboutContent, saveAboutContent }}>
      {children}
    </AboutSectionContext.Provider>
  );
};
