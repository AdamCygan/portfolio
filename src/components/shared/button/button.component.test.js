import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button.component";

describe("Button", () => {
  it("renders the button with the correct text", () => {
    render(<Button onClick={() => {}} />);

    const button = screen.getByRole("button", { name: /play again/i });

    expect(button).toBeInTheDocument();
  });

  it("renders the button with custom text", () => {
    render(<Button onClick={() => {}} label='Retry' />);

    const button = screen.getByRole("button", { name: /retry/i });

    expect(button).toBeInTheDocument();
  });

  it("when clicked it should call the onClick handler", () => {
    const mockOnClick = jest.fn();

    render(<Button onClick={mockOnClick} />);

    const button = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("when button is disabled it should not call onClick", () => {
    const mockOnClick = jest.fn();

    render(<Button onClick={mockOnClick} disabled={true} />);

    const button = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
