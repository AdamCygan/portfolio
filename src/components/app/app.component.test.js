import { render, screen } from "@testing-library/react";
import App from "./app.component";

jest.mock("../game", () => ({
  MemoryGameContainer: () => <div data-testid='memory-game-container' />,
}));

describe("App Component", () => {
  test("should render the App component with the title", () => {
    render(<App />);

    const title = screen.getByText("Memory Game!");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("app__title");
  });

  test("renders the MemoryGameContainer component", () => {
    render(<App />);

    const container = screen.getByTestId("memory-game-container");

    expect(container).toBeInTheDocument();
  });
});
