import React, { Component } from "react";
import Card from "./card"; // Import your Card component
import "./grid.css";
import Scoreboard from "./scoreboard";
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
      score: 0, // Initialize the score
    };
  }

  handleCardFlip = (className) => {
    const { flippedCards } = this.state;
    if (flippedCards.includes(className)) {
      this.setState(
        (prevState) => ({
          flippedCards: prevState.flippedCards.filter((c) => c !== className),
        }),
        this.checkMatch // Check for a match after a card flip
      );
    } else {
      this.setState(
        (prevState) => ({
          flippedCards: [...prevState.flippedCards, className],
        }),
        this.checkMatch // Check for a match after a card flip
      );
    }
  };

  checkMatch = () => {
    const { flippedCards } = this.state;
    if (flippedCards.length === 2) {
      if (flippedCards[0] === flippedCards[1]) {
        // Match found, increment the score
        this.setState((prevState) => ({
          score: prevState.score + 1,
        }));
      }
      // Clear the flipped cards array
      this.setState({
        flippedCards: [],
      });
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
        <Scoreboard score={this.state.score} flippedCards={this.state.flippedCards} />
        <div className="grid">{this.renderGrid()}</div>
      </div>
    );
  }
}

export default Grid;
