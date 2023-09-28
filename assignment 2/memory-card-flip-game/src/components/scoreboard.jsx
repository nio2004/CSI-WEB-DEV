import React from "react";

function Scoreboard({ cardFlipCounts }) {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <ul>
        {Object.keys(cardFlipCounts).map((className) => (
          <li key={className}>
            {className}: {cardFlipCounts[className]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scoreboard;
