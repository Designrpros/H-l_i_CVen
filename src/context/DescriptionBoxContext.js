// In your useDescriptionBox hook or context provider
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path as necessary
import { doc, getDoc } from "firebase/firestore";

const DescriptionBoxContext = createContext();

export const useDescriptionBox = () => useContext(DescriptionBoxContext);

export const DescriptionBoxProvider = ({ children }) => {
  const [descriptionContent, setDescriptionContent] = useState({ elements: [], icon: '' });

  useEffect(() => {
    const fetchDescriptionContent = async () => {
      const docRef = doc(db, "descriptionBox", "yourActualDocId"); // Replace "yourActualDocId" with your document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setDescriptionContent(docSnap.data()); // Update state with fetched data
      } else {
        console.log("No such document!");
      }
    };

    fetchDescriptionContent();
  }, []);

  const updateDescriptionContent = async (newContent) => {
    // Function to update Firestore and local state as shown in your previous example
  };

  return (
    <DescriptionBoxContext.Provider value={{ descriptionContent, updateDescriptionContent }}>
      {children}
    </DescriptionBoxContext.Provider>
  );
};
