import { EMOJIS } from "../../constants/emoji";
import { shuffle } from "../shuffle";

export const generateCards = (totalCount, matchCount) => {
  const numGroups = totalCount / matchCount;

  if (numGroups > EMOJIS.length) {
    throw new Error("Not enough emojis available.");
  }

  const emojiSubset = EMOJIS.slice(0, numGroups);
  const cards = emojiSubset.flatMap((emoji) =>
    Array.from({ length: matchCount }, () => emoji)
  );

  shuffle(cards);

  return cards;
};
