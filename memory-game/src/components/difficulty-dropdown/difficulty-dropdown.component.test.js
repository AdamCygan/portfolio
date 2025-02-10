import { render, screen } from "@testing-library/react";
import { DifficultyDropdown } from "./difficulty-dropdown.component";
import { DIFFICULTY_LEVELS } from "../../constants/difficulty-levels";

describe("Difficulty Dropdown Component", () => {
  const mockOnChange = jest.fn();

  test("should renders the correct number of options", () => {
    render(
      <DifficultyDropdown levels={DIFFICULTY_LEVELS} onChange={mockOnChange} />
    );

    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(DIFFICULTY_LEVELS.length);
  });

  test("when and empty array is provided should not break", () => {
    render(<DifficultyDropdown levels={[]} onChange={mockOnChange} />);

    const options = screen.queryAllByRole("option");

    expect(options).toHaveLength(0);
  });
});
