import React, { useState } from "react";

function Card(){
    const [isFlipped, setisFlipped] = useState(false);

    const flipCard = () => {
        setisFlipped(!isFlipped);
    };

    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
          {isFlipped ? 'Back' : 'Front'}
        </div>
      );
    }

export default Card;

    