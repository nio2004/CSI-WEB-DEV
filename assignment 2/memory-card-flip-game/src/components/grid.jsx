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
  constructor(props) {
    super(props);
    this.state = {
      flippedCards: [],
      cardFlipCounts: {}, // To store flip counts for each card classname
      matchingCardCount: 0, // Counter for matching cards
    };
  }

  handleCardFlip = (className) => {
    const { flippedCards, cardFlipCounts, matchingCardCount } = this.state;

    // Update the flipped cards
    if (flippedCards.includes(className)) {
      this.setState({
        flippedCards: flippedCards.filter((c) => c !== className),
      });
    } else {
      this.setState({
        flippedCards: [...flippedCards, className],
      });
    }

    // Update the flip counts for the card classname
    const newCardFlipCounts = { ...cardFlipCounts };
    newCardFlipCounts[className] = (newCardFlipCounts[className] || 0) + 1;

    // Check if there are two flips for the same classname
    if (newCardFlipCounts[className] === 2) {
      // Increment the matching card counter
      this.setState({
        matchingCardCount: matchingCardCount + 1,
      });
    }

    this.setState({
      cardFlipCounts: newCardFlipCounts,
    });
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
        const isFlipped = this.state.flippedCards.includes(className);
        rowItems.push(
          <Card
            key={cardIndex}
            className={className}
            isFlipped={isFlipped}
            onCardClick={this.handleCardFlip}
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
        <p>Matching Card Count: {this.state.matchingCardCount}</p>
      </div>
    );
  }
}

export default Grid;
