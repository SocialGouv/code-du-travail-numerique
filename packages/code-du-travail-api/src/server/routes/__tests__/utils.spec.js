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

const test_key = [
  {
    input: [
      {
        _source: {
          slug: "whateverslug",
          source: "fiches"
        }
      }
    ],
    expected: [
      {
        _source: {
          slug: "whateverslug",
          source: "fiches"
        },
        key: "ficheswhateverslug"
      }
    ]
  },
  {
    input: [
      {
        _source: {
          slug: "anotherkey",
          source: "fiches"
        }
      }
    ],

    expected: [
      {
        _source: {
          slug: "anotherkey",
          source: "fiches"
        },
        key: "fichesanotherkey"
      }
    ]
  }
];

const test_dupl = [
  {
    input: [
      {
        whatever: "whatever",
        key: "hey"
      },
      {
        otherever: "whatvvero",
        key: "hey"
      }
    ],
    expected: [
      {
        whatever: "whatever",
        key: "hey"
      }
    ]
  }
];

test("test merge two", () => {
  tests.forEach(t => {
    expect(utils.merge(t.input[0], t.input[1], 10)).toEqual(t.expected);
  });
});

//console.log(addKey(test_key.input[0]))
test("test addKey", () => {
  test_key.forEach(t => {
    expect(utils.addKey(t.input)).toEqual(t.expected);
  });
});

test("test remove duplicates", () => {
  test_dupl.forEach(t => {
    expect(utils.removeDuplicate(t.input)).toEqual(t.expected);
  });
});
