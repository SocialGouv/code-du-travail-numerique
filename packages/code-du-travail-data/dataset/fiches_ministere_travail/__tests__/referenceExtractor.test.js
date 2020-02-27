const fs = require("fs");
const path = require("path");
const { classifyTokens, extractReferences } = require("../referenceExtractor");

const annotatedTokens = fs
  .readFileSync(path.join(__dirname, "referenceExtractor.test.txt"))
  .toString()
  .split("\n");

const tokens = [];
const labels = [];

annotatedTokens.map(line => {
  const [t, l] = line.split("\t");
  tokens.push(t);
  labels.push(l);
});

const testCases = [
  {
    input:
      "l’allocation de remplacement pour maternité ou paternité, prévues aux articles L. 613-19 à L. 613-19-2 et L. 722-8 à L. 722-8-3 du code de la sécurité sociale, aux articles L. 732-10 à L. 732-12-1 du code rural et à l’article 17 de la loi n° 97-1051 du 18 novembre 1997 d’orientation sur la pêche maritime et les cultures marines",
    expected: [
      "L. 613-19",
      "L. 613-19-2",
      "L. 722-8",
      "L. 722-8-3",
      "L. 732-10",
      "L. 732-12-1"
    ]
  },
  {
    input: `Article D212 du code penal et article R413 du code civil`,
    expected: ["D212", "R413"]
  },
  { input: `Article D212`, expected: ["D212"] },
  { input: `Article D-212`, expected: ["D-212"] },
  { input: `Article D.212`, expected: ["D.212"] },
  { input: `Article D212-3`, expected: ["D212-3"] },
  { input: `Article D-212-4`, expected: ["D-212-4"] },
  { input: `Article X*212-4`, expected: [] },
  { input: `Article D. 212-4`, expected: ["D. 212-4"] },
  { input: `Article D.  212-4`, expected: ["D. 212-4"] },
  { input: `Article D.212-5`, expected: ["D.212-5"] },
  { input: `Article D.212-5-6`, expected: ["D.212-5-6"] },
  { input: `Article D.212-5-6-7`, expected: ["D.212-5-6-7"] },
  { input: `Article XD212`, expected: [] }
];

test("should extract article tokens in examples", () => {
  return testCases.forEach(({ input, expected }) => {
    const preds = extractReferences(input);
    // console.log(preds);
    expect(preds).toEqual(expected);
  });
});
