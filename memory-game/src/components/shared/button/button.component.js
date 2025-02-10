import "./button.style.css";

export const Button = ({ onClick, label = "Play Again", disabled = false }) => {
  return (
    <button
      className='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </button>
  );
};
