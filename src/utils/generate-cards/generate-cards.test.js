import { EMOJIS } from "../../constants/emoji";
import { generateCards } from "./generate-cards";

test("generates a shuffled array of cards", () => {
  const totalCount = 6;
  const matchCount = 2;
  const cards = generateCards(totalCount, matchCount);

  expect(cards).toHaveLength(totalCount);
  expect(new Set(cards).size).toBe(totalCount / matchCount);
});

test("uses the correct emojis from the constants", () => {
  const totalCount = 6;
  const matchCount = 2;
  const cards = generateCards(totalCount, matchCount);

  const usedEmojis = EMOJIS.slice(0, totalCount / matchCount);
  expect(usedEmojis.every((emoji) => cards.includes(emoji))).toBe(true);
});
