const utils = require("./utils");

// test merge:

const tests = [
  {
    input: [
      [
        {
          title: 1,
          score: 2
        }
      ],
      [
        {
          title: 2,
          score: 4
        }
      ]
    ],
    expected: [{ title: 1, score: 2 }, { title: 2, score: 4 }]
  }
];

const test_one_missing = [
  {
    input: [
      [
        {
          title: 1,
          score: 2
        }
      ],
      []
    ],
    expected: [{ title: 1, score: 2 }]
  }
];

test("test merge two", () => {
  tests.forEach(t => {
    expect(utils.merge(...t.input)).toEqual(t.expected);
  });
});

test("test merge one missing", () => {
  test_one_missing.forEach(t => {
    expect(utils.merge(...t.input)).toEqual(t.expected);
  });
});
