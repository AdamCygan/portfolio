import { render, screen } from "@testing-library/react";
import MemoryGameGrid from "./memory-game-grid.component";

describe("MemoryGameGrid Component", () => {
  const mockOnFlip = jest.fn();
  const rows = 2;
  const cols = 2;
  const cards = ["A", "B", "A", "B"];
  const flipped = [0, 2];
  const matched = new Set(["A"]);

  test("renders the correct number of Card components", () => {
    render(
      <MemoryGameGrid
        rows={rows}
        cols={cols}
        cards={cards}
        flipped={flipped}
        matched={matched}
        onFlip={mockOnFlip}
      />
    );

    const renderedCards = screen.getAllByRole("button");

    expect(renderedCards).toHaveLength(cards.length);
  });
});
