const utils = require("../search/utils");
const arr1 = [
  {
    _source: {
      whatever: "whatever",
      slug: "a",
      source: "a",
      algo: "ft",
    },
  },
  {
    _source: {
      whatever: "whatever",
      slug: "hey",
      source: "a",
      algo: "ft",
    },
  },
];
const arr2 = [
  {
    _source: {
      whatever: "whatever",
      slug: "hey",
      source: "a",
      algo: "sem",
    },
  },
  {
    _source: {
      whatever: "whatever",
      slug: "c",
      source: "a",
      algo: "sem",
    },
  },
];

const tests = [
  {
    input: [
      [
        {
          title: 1,
          score: 2,
        },
      ],
      [
        {
          title: 2,
          score: 4,
        },
      ],
    ],
    expected: [
      { title: 1, score: 2 },
      { title: 2, score: 4 },
    ],
  },
  {
    input: [
      [
        {
          title: 1,
          score: 2,
        },
      ],
      [],
    ],
    expected: [{ title: 1, score: 2 }],
  },
];

const test_dupl = [
  {
    input: arr1.concat(arr2),
    expected: [
      {
        _source: {
          whatever: "whatever",
          slug: "a",
          source: "a",
          algo: "ft",
        },
      },
      {
        _source: {
          whatever: "whatever",
          slug: "hey",
          source: "a",
          algo: "ft",
        },
      },
      {
        _source: {
          whatever: "whatever",
          slug: "c",
          source: "a",
          algo: "sem",
        },
      },
    ],
  },
];
const test_mergePipe_result = [
  {
    _source: {
      whatever: "whatever",
      slug: "a",
      source: "a",
      algo: "ft",
    },
  },
  {
    _source: {
      whatever: "whatever",
      slug: "hey",
      source: "a",
      algo: "both",
    },
  },
  {
    _source: {
      whatever: "whatever",
      slug: "c",
      source: "a",
      algo: "sem",
    },
  },
];
test("test merge two", () => {
  tests.forEach(t => {
    expect(utils.merge(t.input[0], t.input[1], 10)).toEqual(t.expected);
  });
});

test("test remove duplicates", () => {
  test_dupl.forEach(t => {
    expect(utils.removeDuplicate(t.input)).toEqual(t.expected);
  });
});

test("test mergePipe", () => {
  test_dupl.forEach(() => {
    expect(utils.mergePipe(arr1, arr2, 4)).toEqual(test_mergePipe_result);
  });
});
