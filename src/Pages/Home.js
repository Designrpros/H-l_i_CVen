import React, { useState } from 'react';
import HeroSection from '../component/HeroSection';
import AboutSection from '../component/AboutSection';
import CoffeeCategories from '../component/CoffeeCategories';
import ProductShowcase from '../component/ProductShowcase';

import GallerySection from '../component/GallerySection';
import CooperationSection from '../component/CooperationSection';

import Footer from '../component/Footer';

function Home() {

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CoffeeCategories/>
      <GallerySection />
      <CooperationSection />
      <Footer />
    </div>
  );
}

export default Home;
