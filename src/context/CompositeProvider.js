// src/context/CompositeProvider.js
import React from 'react';
import { HeroSectionProvider } from './HeroSectionContext';
import { AboutSectionProvider } from './AboutSectionContext';
import { DescriptionBoxProvider } from './DescriptionBoxContext';
import { GalleryProvider } from './GalleryContext';
import { ContactProvider } from './ContactContext';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import { CartProvider } from './CartContext'; // Import CartProvider

const CompositeProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <HeroSectionProvider>
          <AboutSectionProvider>
            <DescriptionBoxProvider>
              <GalleryProvider>
                <ContactProvider>
                  {children}
                </ContactProvider>
              </GalleryProvider>
            </DescriptionBoxProvider>
          </AboutSectionProvider>
        </HeroSectionProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default CompositeProvider;
