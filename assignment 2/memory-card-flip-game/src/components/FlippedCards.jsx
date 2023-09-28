import React from "react";

function FlippedCards({ flippedCards }) {
  return (
    <div>
      <h3>Flipped Cards:</h3>
      <ul>
        {flippedCards.map((className, index) => (
          <li key={index}>{className}</li>
        ))}
      </ul>
    </div>
  );
}

export default FlippedCards;
