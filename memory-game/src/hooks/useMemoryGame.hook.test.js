import { renderHook } from "@testing-library/react";
import { generateCards } from "../utils/generate-cards";
import { useMemoryGame } from "./useMemoryGame.hook";
import { DEFAULT_GAME_SETTINGS } from "../constants/default-settings";
import { act } from "react";
import { DIFFICULTY_LEVELS } from "../constants/difficulty-levels";

jest.mock("../utils/generate-cards", () => ({
  generateCards: jest.fn(),
}));

jest.mock("../constants/default-settings", () => ({
  DEFAULT_GAME_SETTINGS: {
    rows: 2,
    cols: 2,
    matchCount: 2,
    delay: 3000,
  },
}));

jest.mock("../constants/difficulty-levels", () => ({
  DIFFICULTY_LEVELS: [
    { name: "Easy", rows: 2, cols: 2, matchCount: 2, delay: 3000 },
    { name: "Medium", rows: 4, cols: 4, matchCount: 2, delay: 2000 },
    { name: "Hard", rows: 6, cols: 6, matchCount: 3, delay: 1500 },
  ],
}));

describe("useMemoryGame", () => {
  beforeEach(() => {
    generateCards.mockImplementation((totalCards, matchCount) =>
      Array(totalCards)
        .fill("card")
        .map((_, i) => `card${Math.floor(i / matchCount)}`)
    );
  });

  test("should initialize with default settings", () => {
    const { result } = renderHook(() => useMemoryGame());

    expect(result.current.settings).toEqual(DEFAULT_GAME_SETTINGS);
    expect(result.current.cards).toHaveLength(4);
    expect(result.current.flipped).toEqual([]);
    expect(result.current.matched.size).toBe(0);
    expect(result.current.gameCompleted).toBe(false);
  });

  test("should flip card correctly", () => {
    const { result } = renderHook(() => useMemoryGame());

    act(() => {
      result.current.handleFlip(0);
    });

    expect(result.current.flipped).toEqual([0]);
  });

  test("should reset the game correctly", () => {
    const { result } = renderHook(() => useMemoryGame());

    act(() => {
      result.current.handleFlip(0);
      result.current.handleResetGame();
    });

    expect(result.current.flipped).toEqual([]);
    expect(result.current.matched.size).toBe(0);
    expect(result.current.gameCompleted).toBe(false);
    expect(result.current.cards).toHaveLength(4);
  });

  test("should change difficulty level", () => {
    const { result } = renderHook(() => useMemoryGame());

    act(() => {
      result.current.handleChangeDifficulty("Medium");
    });

    expect(result.current.settings).toEqual(DIFFICULTY_LEVELS[1]); // Includes `name`
    expect(result.current.cards).toHaveLength(16); // 4 rows * 4 cols
    expect(result.current.flipped).toEqual([]);
  });
});
