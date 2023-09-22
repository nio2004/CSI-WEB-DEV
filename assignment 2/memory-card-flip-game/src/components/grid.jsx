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

        rowItems.push(
          <Card frontImage="https://picsum.photos/100/150" />
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
