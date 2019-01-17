const {
  sum,
  percent,
  computeScore,
  computeLineScore,
  printResultsAbstract,
  printResultsDetails
} = require("../lib");

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
  {
    Expected_1: "a.url",
    Expected_2: "",
    Expected_3: "",
    Expected_4: "",
    Expected_5: ""
  },
  {
    Expected_1: "a.url",
    Expected_2: "b.url",
    Expected_3: "c.url",
    Expected_4: "d.url",
    Expected_5: "e.url"
  },
  {
    Expected_1: "o.url",
    Expected_2: "z.url",
    Expected_3: "x.url",
    Expected_4: "y.url",
    Expected_5: "u.url"
  },
  {
    Expected_1: "e.url",
    Expected_2: "d.url",
    Expected_3: "c.url",
    Expected_4: "b.url",
    Expected_5: "a.url"
  }
])(
  "computeLineScore should return an object with prevScore, score, diffScore properties",
  line => {
    const hits = [
      { _source: { url: "a.url" } },
      { _source: { url: "b.url" } },
      { _source: { url: "c.url" } },
      { _source: { url: "d.url" } },
      { _source: { url: "e.url" } }
    ];
    expect(computeLineScore(line, hits)).toMatchSnapshot();
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
      Request: "Fromage",
      prevScore: 0.1,
      score: 0.2,
      diffScore: 0.1
    },
    {
      Request: "Entrées",
      prevScore: 0.5,
      score: 0.2,
      diffScore: 0.3
    },
    {
      Request: "Legumes",
      prevScore: 0,
      score: 1,
      diffScore: 1
    }
  ];
  expect(printResultsDetails(results)).toMatchSnapshot();
});
