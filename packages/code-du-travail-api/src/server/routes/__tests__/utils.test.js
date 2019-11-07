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

const test_dupl = [
  {
    input: [
      {
        _source: {
          whatever: "whatever",
          slug: "a",
          source: "a"
        }
      },
      {
        _source: {
          whatever: "whatever",
          slug: "hey",
          source: "a"
        }
      },
      {
        _source: {
          whatever: "whatever",
          slug: "hey",
          source: "a"
        }
      },
      {
        _source: {
          whatever: "whatever",
          slug: "c",
          source: "a"
        }
      }
    ],
    expected: [
      {
        _source: {
          whatever: "whatever",
          slug: "a",
          source: "a"
        }
      },
      {
        _source: {
          whatever: "whatever",
          slug: "hey",
          source: "a"
        }
      },
      {
        _source: {
          whatever: "whatever",
          slug: "c",
          source: "a"
        }
      }
    ]
  }
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
