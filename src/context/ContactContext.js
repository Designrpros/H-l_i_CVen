// src/context/ContactContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    facebook: '',
    instagram: '',
    mapUrl: '',
    description: '', // Ensure you have a description field
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const docRef = doc(db, "contact", "info");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactInfo(docSnap.data());
      } else {
        console.log("No contact info found");
      }
    };

    fetchContactInfo();
  }, []);

  const updateContactInfo = async (newInfo) => {
    await setDoc(doc(db, "contact", "info"), newInfo);
    setContactInfo(newInfo);
  };

  return (
    <ContactContext.Provider value={{ contactInfo, updateContactInfo }}>
      {children}
    </ContactContext.Provider>
  );
};
