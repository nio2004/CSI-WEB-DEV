import React, { Component } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/apple.jpg', matched: false },
  { src: '/img/banana.jpg', matched: false },
  { src: '/img/kiwi.jpg', matched: false },
  { src: '/img/mango.jpg', matched: false },
  { src: '/img/orange.jpg', matched: false },
  { src: '/img/papaya.jpg', matched: false }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      turns: 0,
      choiceOne: null,
      choiceTwo: null,
      disabled: false
    };
  }

  componentDidMount() {
    this.shuffleCards();
  }

  shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    this.setState({
      cards: shuffledCards,
      choiceOne: null,
      choiceTwo: null,
      turns: 0
    });
  }

  handleChoice = (card) => {
    const { choiceOne, choiceTwo } = this.state;
    if (!choiceOne) {
      this.setState({ choiceOne: card });
    } else {
      this.setState({ choiceTwo: card, disabled: true }, () => {
        this.compareChoices();
      });
    }
  }

  compareChoices = () => {
    const { choiceOne, choiceTwo, cards } = this.state;
    setTimeout(() => {
      if (choiceOne.src === choiceTwo.src) {
        const updatedCards = cards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          }
          return card;
        });
        this.setState({
          cards: updatedCards,
          turns: this.state.turns + 1,
          choiceOne: null,
          choiceTwo: null,
          disabled: false
        });
      } else {
        this.setState({
          turns: this.state.turns + 1,
          choiceOne: null,
          choiceTwo: null,
          disabled: false
        });
      }
    }, 1000);
  }

  render() {
    const { cards, turns, disabled, choiceOne, choiceTwo } = this.state;
    return (
      <div className="App">
        <h1>Memory Game</h1>
        <button onClick={this.shuffleCards}>New Game</button>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={this.handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    );
  }
}

export default App;
