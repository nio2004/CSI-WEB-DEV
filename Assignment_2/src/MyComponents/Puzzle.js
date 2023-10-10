import React, { useState } from 'react';
import './Puzzle.css';

const Puzzle = () => {
  const [tiles, setTiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, '']);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const sourceIndex = e.dataTransfer.getData('index');
    const newTiles = [...tiles];
    [newTiles[sourceIndex], newTiles[targetIndex]] = [newTiles[targetIndex], newTiles[sourceIndex]];
    setTiles(newTiles);
  };

  const isSolved = tiles.every((tile, index) => tile === index + 1 || (index === 8 && tile === ''));

  return (
    <div className="puzzle">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`tile ${tile === '' ? 'empty' : ''}`}
          draggable={tile !== ''}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          {tile}
        </div>
      ))}
      {isSolved && <div className="message">Puzzle Solved!</div>}
    </div>
  );
};

export default Puzzle;
