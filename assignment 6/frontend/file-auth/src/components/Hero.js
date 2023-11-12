import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-[#B7CECE] text-white h-96 flex items-center justify-center">
      <div className="container mx-auto p-10 text-center">
        <h1 className="text-4xl text-black font-bold mb-4">Welcome to P Drive</h1>
        <p className="text-lg text-black mb-8">A safe place for your files</p>
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
