import React, { useState, useEffect } from "react";
import "./card.css";

function Card({ className }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoFlipTimeout, setAutoFlipTimeout] = useState(null);

  const flipCard = () => {
    setIsFlipped(!isFlipped);

    if (autoFlipTimeout) {
      clearTimeout(autoFlipTimeout);
    }

    const newAutoFlipTimeout = setTimeout(() => {
      setIsFlipped(false);
    }, 3000); 

    setAutoFlipTimeout(newAutoFlipTimeout);
  };

  useEffect(() => {
    return () => {
      if (autoFlipTimeout) {
        clearTimeout(autoFlipTimeout);
      }
    };
  }, [autoFlipTimeout]);

  return (
    <div className="card-container">
      <div
        className={`card ${className}-${isFlipped ? "flipped" : ""}`}
        onClick={flipCard}
      >
      </div>
    </div>
  );
}

export default Card;
