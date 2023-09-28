import React from "react";

function Scoreboard({ score, flippedCards }) {
  return (
    <div className="scoreboard">
      <div>
        <h2>Score: {score}</h2>
      </div>
      <div>
        <h3>Flipped Cards:</h3>
        <ul>
          {flippedCards.map((className, index) => (
            <li key={index}>{className}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Scoreboard;
