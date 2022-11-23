const utils = require("../search/utils");

const arr1 = [
  {
    _source: {
      algo: "ft",
      slug: "a",
      source: "a",
      whatever: "whatever",
    },
  },
  {
    _source: {
      algo: "ft",
      slug: "hey",
      source: "a",
      whatever: "whatever",
    },
  },
];
const arr2 = [
  {
    _source: {
      algo: "sem",
      slug: "hey",
      source: "a",
      whatever: "whatever",
    },
  },
  {
    _source: {
      algo: "sem",
      slug: "c",
      source: "a",
      whatever: "whatever",
    },
  },
];

const tests = [
  {
    expected: [
      { score: 2, title: 1 },
      { score: 4, title: 2 },
    ],
    input: [
      [
        {
          score: 2,
          title: 1,
        },
      ],
      [
        {
          score: 4,
          title: 2,
        },
      ],
    ],
  },
  {
    expected: [{ score: 2, title: 1 }],
    input: [
      [
        {
          score: 2,
          title: 1,
        },
      ],
      [],
    ],
  },
];

const test_dupl = [
  {
    expected: [
      {
        _source: {
          algo: "ft",
          slug: "a",
          source: "a",
          whatever: "whatever",
        },
      },
      {
        _source: {
          algo: "ft",
          slug: "hey",
          source: "a",
          whatever: "whatever",
        },
      },
      {
        _source: {
          algo: "sem",
          slug: "c",
          source: "a",
          whatever: "whatever",
        },
      },
    ],
    input: arr1.concat(arr2),
  },
];
const test_mergePipe_result = [
  {
    _source: {
      algo: "ft",
      slug: "a",
      source: "a",
      whatever: "whatever",
    },
  },
  {
    _source: {
      algo: "both",
      slug: "hey",
      source: "a",
      whatever: "whatever",
    },
  },
  {
    _source: {
      algo: "sem",
      slug: "c",
      source: "a",
      whatever: "whatever",
    },
  },
];
test("merge two", () => {
  tests.forEach((t) => {
    expect(utils.merge(t.input[0], t.input[1], 10)).toEqual(t.expected);
  });
});

test("remove duplicates", () => {
  test_dupl.forEach((t) => {
    expect(utils.removeDuplicate(t.input)).toEqual(t.expected);
  });
});

test("mergePipe", () => {
  test_dupl.forEach(() => {
    expect(utils.mergePipe(arr1, arr2, 4)).toEqual(test_mergePipe_result);
  });
});
