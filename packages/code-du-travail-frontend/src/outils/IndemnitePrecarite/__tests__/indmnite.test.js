import { getIndemnitePrecarite } from "../indemnite";

const tests = [
  {
    title: "2k, 10m",
    data: {
      salaires: Array.from({ length: 10 }).fill({ salaire: 2000 }),
      typeRemuneration: "mensuel"
    },
    expected: 2000
  },
  {
    title: "2k, 1m",
    data: {
      salaire: 2000,
      typeRemuneration: "total"
    },
    expected: 200
  }
];

describe("getIndemnite", () => {
  tests.forEach(test => {
    it(`${test.title} should return ${test.expected}`, () => {
      const res = getIndemnitePrecarite(test.data);
      expect(res.indemnite).toEqual(test.expected);
    });
  });
});
