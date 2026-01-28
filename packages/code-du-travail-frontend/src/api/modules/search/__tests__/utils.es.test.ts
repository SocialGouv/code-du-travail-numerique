/** @jest-environment node */

import { SearchResult } from "../service";
import { removeDuplicate } from "../utils";

const arr1 = [
  {
    algo: "ft",
    slug: "a",
    source: "a",
    whatever: "whatever",
  },
  {
    algo: "ft",
    slug: "hey",
    source: "a",
    whatever: "whatever",
  },
];
const arr2 = [
  {
    algo: "sem",
    slug: "hey",
    source: "a",
    whatever: "whatever",
  },
  {
    algo: "sem",
    slug: "c",
    source: "a",
    whatever: "whatever",
  },
];

const test_dupl = [
  {
    expected: [
      {
        algo: "ft",
        slug: "a",
        source: "a",
        whatever: "whatever",
      },
      {
        algo: "ft",
        slug: "hey",
        source: "a",
        whatever: "whatever",
      },
      {
        algo: "sem",
        slug: "c",
        source: "a",
        whatever: "whatever",
      },
    ],
    input: arr1.concat(arr2),
  },
];

describe("utils", () => {
  test("remove duplicates", () => {
    test_dupl.forEach((t) => {
      expect(removeDuplicate(t.input as unknown as SearchResult[])).toEqual(
        t.expected
      );
    });
  });
});
