import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">Stock Tracker</Link>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-blue-200">Home</Link>
            </li>
            <li>
              <Link to="/stocks" className="text-white hover:text-blue-200">Stocks</Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-200">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
