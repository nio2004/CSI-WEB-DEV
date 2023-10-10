import React from 'react';
import './App.css';
import Puzzle from './MyComponents/Puzzle';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag and Drop Puzzle</h1>
      </header>
      <main>
        <Puzzle />
      </main>
    </div>
  );
}

export default App;
