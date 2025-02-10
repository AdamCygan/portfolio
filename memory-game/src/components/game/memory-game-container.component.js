import React from "react";
import "./memory-game.style.css";
import MemoryGameGrid from "./memory-game-grid.component";
import { DifficultyDropdown } from "../difficulty-dropdown";
import { DIFFICULTY_LEVELS } from "../../constants/difficulty-levels";
import { useMemoryGame } from "../../hooks/useMemoryGame.hook";
import { Button } from "../shared";

const MemoryGameContainer = () => {
  const {
    settings,
    cards,
    matched,
    flipped,
    gameCompleted,
    handleFlip,
    handleResetGame,
    handleChangeDifficulty,
  } = useMemoryGame();

  return (
    <div className='memory-game__container'>
      {gameCompleted && (
        <div className='memory-game__completion-text'>
          🎉 Congratulations! You completed the game! 🎉
        </div>
      )}
      <DifficultyDropdown
        data-testid='difficulty-dropdown'
        levels={DIFFICULTY_LEVELS}
        onChange={handleChangeDifficulty}
      />
      <MemoryGameGrid
        data-testid='memory-game-grid'
        rows={settings.rows}
        cols={settings.cols}
        cards={cards}
        flipped={flipped}
        matched={matched}
        onFlip={handleFlip}
      />
      <Button
        onClick={handleResetGame}
        data-testid='reset-button'
        aria-label='Play Again'
      />
    </div>
  );
};

export default MemoryGameContainer;
