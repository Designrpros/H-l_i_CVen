import React, { useState } from 'react';
import HeroSection from '../component/HeroSection';
import AboutSection from '../component/AboutSection';
import CoffeeCategories from '../component/CoffeeCategories';
import GallerySection from '../component/GallerySection';
import CooperationSection from '../component/CooperationSection';
import ContactSection from '../component/ContactSection';

import Footer from '../component/Footer';

function Home() {

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CoffeeCategories />
      <GallerySection />
      <CooperationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
