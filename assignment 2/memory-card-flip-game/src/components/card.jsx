import React, { useState } from "react";
import './card.css';

function Card({ frontImage }){
    const [isFlipped, setisFlipped] = useState(false);

    const flipCard = () => {
        setisFlipped(!isFlipped);
    };

    return (
      <div
        className={`card-${isFlipped ? 'flipped' : ''}`}
        onClick={flipCard}
        style={{
          backgroundImage: `url(${frontImage})`,
        }}>
      <p>{isFlipped ? "Flipped" : "Not Flipped"}</p>
      </div>
    );
    
    }

export default Card;

    