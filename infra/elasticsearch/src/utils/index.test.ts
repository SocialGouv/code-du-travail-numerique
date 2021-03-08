import { chunks, getIndicesToDelete, range } from "./";

type TestCase = [string[], number, { index: string }[], { index: string }[]];
const testCases: TestCase[] = [
  [["cdtn"], 1, [{ index: "bob" }, { index: "dylan" }, { index: "yo" }], []],
  [
    ["cdtn", "ccn"],
    3,
    [
      { index: "cdtn-1" },
      { index: "cdtn-2" },
      { index: "cdtn-3" },
      { index: "ccn-1" },
      { index: "ccn-2" },
      { index: "yo" },
    ],
    [{ index: "cdtn-1" }, { index: "ccn-1" }],
  ],
  [
    ["cdtn", "ccn"],
    4,
    [
      { index: "cdtn-1" },
      { index: "cdtn-3" },
      { index: "ccn-1" },
      { index: "ccn-4" },
      { index: "cdtn-2" },
      { index: "cdtn-4" },
      { index: "cdtn-5" },
      { index: "ccn-2" },
      { index: "ccn-3" },
      { index: "yo" },
    ],
    [
      { index: "cdtn-1" },
      { index: "ccn-1" },
      { index: "cdtn-2" },
      { index: "ccn-2" },
      { index: "cdtn-3" },
    ],
  ],
  [
    ["cdtn"],
    4,
    [
      { index: "cdtn-1" },
      { index: "cdtn-2" },
      { index: "cdtn-3" },
      { index: "cdtn-4" },
      { index: "yo" },
    ],
    [{ index: "cdtn-1" }, { index: "cdtn-2" }],
  ],
  [
    ["cdtn"],
    5,
    [
      { index: "cdtn-1" },
      { index: "cdtn-2" },
      { index: "cdtn-3" },
      { index: "cdtn-4" },
      { index: "yo" },
    ],
    [{ index: "cdtn-1" }, { index: "cdtn-2" }, { index: "cdtn-3" }],
  ],
];

describe("getIndicesToDelete", () => {
  test.each<TestCase>(testCases)(
    ".getIndicesToDelete(%j, %d, %j)",
    (patterns, timestamp, indices, indicestoDelete) => {
      expect(getIndicesToDelete(patterns, timestamp, indices)).toEqual(
        indicestoDelete
      );
    }
  );
});

describe("range", () => {
  test.each([
    [0, 8, 2, [0, 2, 4, 6]],
    [4, 9, 3, [4, 7]],
    [3, 12, 4, [3, 7, 11]],
  ])(".range(%j, %d, %j)", (start, end, site, result) => {
    expect(range(start, end, site)).toEqual(result);
  });
});

describe("chunks", () => {
  test.each([
    [
      [0, 2, 4, 6],
      2,
      [
        [0, 2],
        [4, 6],
      ],
    ],
    [
      [4, 5, 6, 7, 8],
      3,
      [
        [4, 5, 6],
        [7, 8],
      ],
    ],
  ])(".chunks(%j, %d, %j)", (items, size, result) => {
    const a = [];
    for (const c of chunks(items, size)) {
      a.push(c);
    }
    expect(a).toEqual(result);
  });
});
