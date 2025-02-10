import "./card.style.css";

const Card = ({ card, index, isMatched, isFlipped, onFlip }) => {
  const handleFlip = () => {
    if (!isMatched && !isFlipped) {
      onFlip(index);
    }
  };

  return (
    <button
      className={`card ${isMatched ? "card--revealed" : ""} ${
        isMatched || isFlipped ? "card--disabled" : ""
      }`}
      onClick={handleFlip}
    >
      {(isMatched || isFlipped) && card}
    </button>
  );
};

export default Card;
