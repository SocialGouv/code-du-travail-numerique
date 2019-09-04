const utils = require("../search/utils");

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
  },
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

const test_one_missing = [
  
];

test("test merge two", () => {
  tests.forEach(t => {
    expect(utils.merge(t.input[0], t.input[1], 10)).toEqual(t.expected);
  });
});
