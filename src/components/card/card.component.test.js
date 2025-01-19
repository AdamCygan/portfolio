import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./card.component";

describe("Card Component", () => {
  const mockOnFlip = jest.fn();

  test("should render the card component", () => {
    render(
      <Card
        card='A'
        index={0}
        isMatched={false}
        isFlipped={false}
        onFlip={mockOnFlip}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  test("when isMatched is true should apply the appropriate class", () => {
    render(
      <Card
        card='A'
        index={0}
        isMatched={true}
        isFlipped={false}
        onFlip={mockOnFlip}
      />
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("card--revealed");
  });

  test("when the card is clicked it should called onFlip", () => {
    render(
      <Card
        card='A'
        index={0}
        isMatched={false}
        isFlipped={false}
        onFlip={mockOnFlip}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnFlip).toHaveBeenCalledWith(0);
  });
});
