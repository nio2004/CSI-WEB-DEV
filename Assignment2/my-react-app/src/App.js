
import React, { Component } from 'react';
import './App.css';

class MemoryCardGame extends Component {
  constructor(props) {
    super(props);

    // Initialize the state
    this.state = {
      cards: this.generateCards(),
      flippedIndices: [],
      matchedPairs: 0
    };
  }

  generateCards() {
    const symbols = ['🐱', '🐶', '🐰', '🐼', '🐵', '🐸'];
    const cards = symbols.concat(symbols).sort(() => Math.random() - 0.5);

    return cards.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));
  }

  handleCardClick(index) {
    if (this.state.flippedIndices.length >= 2) {
      return;
    }

    const cards = [...this.state.cards];
    cards[index].isFlipped = true;

    const flippedIndices = [...this.state.flippedIndices, index];
    this.setState({ cards, flippedIndices }, () => {
      if (flippedIndices.length === 2) {
        this.checkMatch();
      }
    });
  }

  checkMatch() {
    const [index1, index2] = this.state.flippedIndices;
    const cards = [...this.state.cards];

    if (cards[index1].symbol === cards[index2].symbol) {
      cards[index1].isMatched = true;
      cards[index2].isMatched = true;

      this.setState({
        cards,
        matchedPairs: this.state.matchedPairs + 1,
        flippedIndices: []
      });
    } else {
      setTimeout(() => {
        cards[index1].isFlipped = false;
        cards[index2].isFlipped = false;

        this.setState({ cards, flippedIndices: [] });
      }, 1000);
    }
  }

  render() {
    return (
      <div className="memory-card-game">
        {this.state.cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={() => this.handleCardClick(index)}
          >
            {card.isFlipped || card.isMatched ? card.symbol : '❓'}
          </div>
        ))}
      </div>
    );
  }
}







export default MemoryCardGame;
