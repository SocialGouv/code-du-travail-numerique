const fs = require("fs");
const path = require("path");
const { classifyTokens, extractReferences } = require("../referenceExtractor");
const { resolveReferences } = require("../referenceResolver");

const annotatedTokens = fs
  .readFileSync(path.join(__dirname, "referenceExtractor.test.txt"))
  .toString()
  .split("\n");

const tokens = [];
const labels = [];

annotatedTokens.map((line) => {
  const [t, l] = line.split("\t");
  tokens.push(t);
  labels.push(l);
});

const testCases = [
  {
    input:
      "les modalités fixées par les articles L. 2313-8 et R. 2313-3 à R. 2313-6 du code du travail ainsi que le L. 1251-18",
  },
  {
    input:
      "l’allocation de remplacement pour maternité ou paternité, prévues aux articles L. 613-19 à L.613-19-2 et L. 722-8 à 25 du code de la sécurité sociale, aux articles L. 732-10 à L. 732-12-1 du code rural et à l’article 17 de la loi n° 97-1051 du 18 novembre 1997 d’orientation sur la pêche maritime et les cultures marines",
  },
  {
    input: `Article D212 du code penal et article R413 du code civil`,
  },
  { input: `Article D212` },
  { input: `Article D-212` },
  { input: `Article D.212` },
  { input: `Article D212-3` },
  { input: `Article D-212-4` },
  { input: `Article X*212-4` },
  { input: `Article D. 212-4` },
  { input: `Article D.  212-4` },
  { input: `Article D.212-5` },
  { input: `Article D.212-5-6` },
  { input: `Article D.212-5-6-7` },
  { input: `Article XD212` },
];

test("should extract article tokens in examples", () => {
  expect(
    testCases.map(({ input }) => extractReferences(input))
  ).toMatchSnapshot();
});

test("should success with actual real life set", () => {
  const predictions = classifyTokens(tokens);
  // keep this to easily check prediction errors :
  /*
  const report = tokens.map((t, i) => {
    const label = labels[i];
    const prediction = predictions[i];
    const ok = prediction == label;
    return [
      `${ok ? "\x1b[0m" : "\x1b[31m"}`,
      `${t}\t${label}\t${prediction}\n`
    ];
  });
  console.log(...report.flat());
  */
  expect(predictions).toEqual(labels);
});

it("should find with code for actual real life set", () =>
  expect(extractReferences(tokens.join(" "))).toMatchSnapshot());

it("should resolve example codes", () => {
  const refs = extractReferences(testCases[0].input);
  expect(resolveReferences(refs)).toMatchSnapshot();
});

const rangeCases = [
  "articles R. 2313-3 à R. 2313-6 et article R.2313-3",
  "articles R. 2313-3-2 à R. 2313-3-10",
  "articles L 4121-1 à 5",
  "L. 732-10 à L. 732-12-2",
  "L. 613-19 à L. 613-19-2",
  "L. 613-2 à L. 614",
  "articles L. 1237-17 à L. 1237-16-14 du code du travail",
];

it("should resolve ranges", () => {
  const refs = rangeCases.map((c) => {
    const extractedRefs = extractReferences(c);
    const resolvedRefs = resolveReferences(extractedRefs);
    return resolvedRefs;
  });

  expect(refs).toMatchSnapshot();
});
