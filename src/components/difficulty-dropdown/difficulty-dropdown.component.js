import { useId } from "react";
import "./difficulty-dropdown.style.css";

export const DifficultyDropdown = ({ levels, onChange }) => {
  const id = useId();

  return (
    <div className='difficulty-dropdown'>
      <select
        id={id}
        onChange={(e) => onChange(e.target.value)}
        className='difficulty-dropdown__select'
      >
        {levels.map((level) => (
          <option
            key={level.name}
            value={level.name}
            className='difficulty-dropdown__option'
          >
            {level.name}
          </option>
        ))}
      </select>
    </div>
  );
};
