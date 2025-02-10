import { shuffle } from "./shuffle";

test("shuffles an array in place", () => {
  const array = [1, 2, 3, 4, 5];
  const originalArray = [...array];

  shuffle(array);

  expect(array).toHaveLength(originalArray.length);
  expect(array.sort((a, b) => a - b)).toEqual(
    originalArray.sort((a, b) => a - b)
  );
});
