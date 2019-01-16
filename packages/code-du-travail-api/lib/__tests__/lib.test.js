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

test("percent should return a percent value", () => {
  const data = [
    [0.1304323203230232, "13.04%"],
    [0.1300323203230232, "13%"],
    [0.0900323203230232, "9%"],
    [0.0920323203230232, "9.2%"]
  ];
  data.forEach(([value, percentage]) => {
    expect(percent(value)).toEqual(percentage);
  });
});

test("computeScore should return a score between 0 and 1", () => {
  const testCases = [
    {
      expected: ["A", "B", "", ""],
      actual: ["A", "G", "F", "E"],
      score: 0.5
    },
    {
      expected: ["A", "B", "C", "D"],
      actual: ["A", "G", "F", "E"],
      score: 0.25
    },
    {
      expected: ["A", "", "", ""],
      actual: ["A", "G", "F", "E"],
      score: 1
    }
  ];
  testCases.forEach(({ expected, actual, score }) => {
    expect(computeScore(expected, actual)).toEqual(score);
  });
});

test("computeLineScore should return an object with prevScore, score, diffScore properties", () => {
  const hits = [
    { _source: { url: "a.url" } },
    { _source: { url: "b.url" } },
    { _source: { url: "c.url" } },
    { _source: { url: "d.url" } },
    { _source: { url: "e.url" } }
  ];
  const testCases = [
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
  ];
  testCases.forEach(line => {
    expect(computeLineScore(line, hits)).toMatchSnapshot();
  });
});

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
