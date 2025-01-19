import { useCallback, useRef, useState } from "react";
import { generateCards } from "../utils/generate-cards";
import { DIFFICULTY_LEVELS } from "../constants/difficulty-levels";
import { DEFAULT_GAME_SETTINGS } from "../constants/default-settings";

export const useMemoryGame = () => {
  const [settings, setSettings] = useState(DEFAULT_GAME_SETTINGS);

  const [cards, setCards] = useState(
    generateCards(settings.rows * settings.cols, settings.matchCount)
  );
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);
  const waitTimer = useRef(null);

  const handleResetGame = useCallback(() => {
    const { rows, cols, matchCount } = settings;
    waitTimer.current = null;

    setCards(generateCards(rows * cols, matchCount));
    setFlipped([]);
    setMatched(new Set());
    setGameCompleted(false);
  }, [settings]);

  const handleFlip = useCallback(
    (index) => {
      const { rows, cols, matchCount, delay } = settings;
      let currFlipped = flipped;

      if (waitTimer.current) {
        clearTimeout(waitTimer.current);
        currFlipped = [];
        waitTimer.current = null;
      }

      const newFlipped = [...currFlipped, index];
      setFlipped(newFlipped);

      if (newFlipped.length < matchCount) return;

      const isMatch = newFlipped.every(
        (i) => cards[newFlipped[0]] === cards[i]
      );

      if (isMatch) {
        const newMatched = new Set(matched).add(cards[newFlipped[0]]);
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.size * matchCount === rows * cols)
          setGameCompleted(true);
      } else {
        waitTimer.current = setTimeout(() => {
          setFlipped([]);
        }, delay);
      }
    },
    [cards, flipped, matched, settings]
  );

  const handleChangeDifficulty = (level) => {
    const selectedLevel = DIFFICULTY_LEVELS.find((item) => item.name === level);

    if (selectedLevel) {
      setSettings(selectedLevel);

      setCards(
        generateCards(
          selectedLevel.rows * selectedLevel.cols,
          selectedLevel.matchCount
        )
      );
      setFlipped([]);
      setMatched(new Set());
      setGameCompleted(false);
    }
  };

  return {
    settings,
    cards,
    flipped,
    matched,
    gameCompleted,
    handleFlip,
    handleResetGame,
    handleChangeDifficulty,
  };
};
