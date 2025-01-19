import React from "react";
import "./memory-game.style.css";
import { Card } from "../card";

const MemoryGameGrid = ({ rows, cols, cards, flipped, matched, onFlip }) => {
  return (
    <div
      className='memory-game__grid'
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          isMatched={matched.has(card)}
          isFlipped={flipped.includes(index)}
          onFlip={onFlip}
        />
      ))}
    </div>
  );
};

export default MemoryGameGrid;
