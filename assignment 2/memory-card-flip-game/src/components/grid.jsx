// Grid.jsx
import React from "react";
import Card from './card';

function Grid(){
  const numRows = 4;
  const numCols = 4;

  const renderGrid = () => {
    const grid = [];
    for(let row = 0; row < numRows; row++){
      const rowItems = [];
      for (let col = 0; col < numCols; col++) {
        // Pass frontImage and backImage props to each Card
        rowItems.push(
          <Card
            
            frontImage="../card-images/jigglypuff.png" // Adjust the path as needed
            backImage="../card-images/jigglypuff.png"   // Replace with your actual image URL
          />  
        );
      }
      grid.push(
        <div className="row" key={row}>
          {rowItems}
        </div>
      );
    }
    return grid;
  };

  return <div className="grid">{renderGrid()}</div>;
}

export default Grid;
