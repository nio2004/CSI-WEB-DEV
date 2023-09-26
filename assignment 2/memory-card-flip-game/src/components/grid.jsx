import React, { Component } from "react";
import Card from "./card";
import "./grid.css";

const cardClassNames = [
  "card-image-1",
  "card-image-1",
  "card-image-2",
  "card-image-2",
  "card-image-3",
  "card-image-3",
  "card-image-4",
  "card-image-4",
  "card-image-5",
  "card-image-5",
  "card-image-6",
  "card-image-6",
  "card-image-7",
  "card-image-7",
  "card-image-8",
  "card-image-8",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(cardClassNames);

class Grid extends Component {
  handleCardFlip = (className, isFlipped) => {
    if (isFlipped) {
      console.log("Flipped Card Class Name:", className);
    } else {
      console.log("Unflipped Card Class Name:", className);
    }
  };

  renderGrid = () => {
    const numRows = 4;
    const numCols = 4;
    const grid = [];

    for (let row = 0; row < numRows; row++) {
      const rowItems = [];
      for (let col = 0; col < numCols; col++) {
        const cardIndex = row * numCols + col;
        const className = cardClassNames[cardIndex];
        rowItems.push(
          <Card
            key={cardIndex}
            className={className}
            onCardFlip={(isFlipped) => this.handleCardFlip(className, isFlipped)}
          />
        );
      }
      grid.push(<div className="row" key={row}>{rowItems}</div>);
    }
    return grid;
  };

  render() {
    return (
      <div>
        <div className="grid">{this.renderGrid()}</div>
      </div>
    );
  }
}

export default Grid;
