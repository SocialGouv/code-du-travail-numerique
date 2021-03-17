//

import { stopwords } from "./index";

test("should return an array of french stop words", () => {
  expect(Array.isArray(stopwords)).toBeTruthy();
  expect(stopwords.length).toBeGreaterThan(0);
  expect(stopwords).toEqual(expect.arrayContaining(["excepté"]));
});
