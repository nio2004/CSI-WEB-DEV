import React from 'react';

function Home() {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to Stock Tracker</h1>
      <p className="text-lg text-blue-700">Track your favorite stocks with ease.</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">
        Get Started
      </button>
    </div>
  );
}

export default Home;
