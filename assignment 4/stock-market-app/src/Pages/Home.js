import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Hero-Section';
import Search from '../components/Search';
import ThemeContext from '../context/ThemeContext';

function Home() {
  return (
    <div>
    <ThemeContext.Provider value={{ darkMode: false }}>
      <Navbar />
      <HeroSection />
      <Search />
      </ThemeContext.Provider>
    </div>
  );
}

export default Home;            


