const {
  sum,
  percent,
  computeScore,
  computeLineScore,
  printResultsAbstract,
  printResultsDetails
} = require("../");

test("sum should return a sum for an array", () => {
  expect(sum(2, 4)).toEqual(6);
});

test.each([
  [0.1304323203230232, "13.04%"],
  [0.1300323203230232, "13%"],
  [0.0900323203230232, "9%"],
  [0.0920323203230232, "9.2%"]
])("percent(%f) should return a %s", (value, expected) => {
  expect(percent(value)).toEqual(expected);
});

test.each([
  [["A", "B", "", ""], 0.5, ["A", "G", "F", "E"]],
  [["A", "B", "C", "D"], 0.25, ["A", "G", "F", "E"]],
  [["A", "", "", ""], 1, ["A", "G", "F", "E"]]
])("computeScore %p should return %f", (results, expected, found) => {
  expect(computeScore(results, found)).toEqual(expected);
});

test.each([
  [["a"], ["/source/slug-a", "", "", "", ""]],
  [
    ["a,b,c,d,e"],
    [
      "/source/slug-a",
      "/source/slug-b",
      "/source/slug-c",
      "/source/slug-d",
      "/source/slug-e"
    ]
  ],
  [
    ["o,z,x,y,u"],
    [
      "/source/slug-o",
      "/source/slug-z",
      "/source/slug-x",
      "/source/slug-y",
      "/source/slug-u"
    ]
  ],
  [
    ["e,d,c,b,a"],
    [
      "/source/slug-e",
      "/source/slug-d",
      "/source/slug-c",
      "/source/slug-b",
      "/source/slug-a"
    ]
  ]
])(
  "computeLineScore should return an object with prevScore, score, diffScore properties for %p",
  (label, expectedResults) => {
    const hits = [
      { _source: { source: "source", slug: "slug-a" } },
      { _source: { source: "source", slug: "slug-b" } },
      { _source: { source: "source", slug: "slug-c" } },
      { _source: { source: "source", slug: "slug-d" } },
      { _source: { source: "source", slug: "slug-e" } }
    ];
    const query = "query";
    const previousResults = {};
    expect(
      computeLineScore({ query, previousResults, expectedResults, hits })
    ).toMatchSnapshot();
  }
);

test("printResultsAbstracts should output absctract", () => {
  const results = [
    {
      prevScore: 0.1,
      score: 0.2,
      diffScOre: 0.1
    }
  ];
  expect(printResultsAbstract(results)).toMatchSnapshot();
});

test("printResultsDetails should output absctract", () => {
  const results = [
    {
      query: "Fromage",
      prevScore: 0.1,
      score: 0.2,
      diffScore: 0.1,
      found: "1/5"
    },
    {
      query: "Entrées",
      prevScore: 0.5,
      score: 0.2,
      diffScore: 0.3,
      found: "1/5"
    },
    {
      query: "Legumes",
      prevScore: 0,
      score: 1,
      diffScore: 1,
      found: "1/1"
    }
  ];
  expect(printResultsDetails(results)).toMatchSnapshot();
});
