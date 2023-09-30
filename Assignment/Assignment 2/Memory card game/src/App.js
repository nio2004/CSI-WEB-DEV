import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/Blastoise.png", matched: false},
  {"src": "/img/Bulbasaur.png", matched: false},
  {"src": "/img/Charizard.png", matched: false},
  {"src": "/img/Ledian.png", matched: false},
  {"src": "/img/Pikachu.png", matched: false},
  {"src": "/img/Alakazam.png", matched: false}
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
    setMatchedPairs(0);
    setShowWinModal(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          );

          const newMatchedPairs = updatedCards.filter((card) => card.matched).length;
          setMatchedPairs(newMatchedPairs);

          return updatedCards;
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (matchedPairs === cardImages.length) {
      setShowWinModal(true);
    }
  }, [matchedPairs]);

  const handleModalClose = () => {
    setShowWinModal(false);
    shuffleCards();
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Memory Card Flip Game</h1>
      <button onClick={shuffleCards}>Restart Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>

      {showWinModal && (
        <div className="win-modal">
          <div className="win-modal-content">
            <h2>Congratulations!</h2>
            <p>You won the game in {turns} turns.</p>
            <button onClick={handleModalClose}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
