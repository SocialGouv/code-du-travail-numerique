import { getIndemnite } from "./0044_indemnite";

const echelon123 = [
  {
    title: "2k, 12mois d'anciennté",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 12,
      indemnite: 500
    },
    expected: 500
  },
  {
    title: "2k, 12mois d'anciennté, OPE + licenciement eco",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 12,
      indemnite: 500,
      hasOpe: true,
      isEco: true
    },
    expected: 2000
  },
  {
    title: "2k, 30mois d'anciennté",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 30,
      indemnite: 1250
    },
    expected: 1500
  },
  {
    title: "2k, 5ans d'anciennté, 51ans",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 60,
      indemnite: 2500,
      age: 51
    },
    expected: 5000
  },
  {
    title: "2k, 5ans d'anciennté, 51ans, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 60,
      indemnite: 2500,
      age: 51,
      hasOpe: true,
      isEco: true
    },
    expected: 7000
  },
  {
    title: "2k, 5ans d'anciennté, 55ans",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 60,
      indemnite: 2500,
      age: 55
    },
    expected: 7000
  },
  {
    title: "2k, 41ans d'anciennté, 55ans",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 492,
      indemnite: 25666.66,
      age: 55
    },
    expected: 28000
  }
];

const echelon4 = [
  {
    title: "2k, 12mois d'anciennté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 12,
      indemnite: 500,
      echelon: { groupe: "IV" }
    },
    expected: 500
  },
  {
    title: "2k, 12mois d'anciennté, groupe IV, OPE + licenciement eco",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 12,
      indemnite: 500,
      hasOpe: true,
      isEco: true,
      echelon: { groupe: "IV" }
    },
    expected: 2000
  },
  {
    title: "2k, 2ans d'anciennté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 24,
      indemnite: 1000,
      echelon: { groupe: "IV" }
    },
    expected: 1200
  },
  {
    title: "2k, 10ans d'anciennté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 120,
      indemnite: 5000,
      echelon: { groupe: "IV" }
    },
    expected: 8000
  },
  {
    title: "2k, 20ans d'anciennté, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 240,
      indemnite: 11666.66,
      echelon: { groupe: "IV" }
    },
    expected: 20000
  },
  {
    title: "2k, 10ans d'anciennté, 51ans, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 120,
      indemnite: 5000,
      age: 51,
      echelon: { groupe: "IV" }
    },
    expected: 10000
  },
  {
    title: "2k, 10ans, 51ans, groupe IV, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 120,
      indemnite: 5000,
      age: 51,
      echelon: { groupe: "IV" },
      hasOpe: true,
      isEco: true
    },
    expected: 12000
  },
  {
    title: "2k, 20ans d'anciennté, 51ans, groupe IV",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 240,
      age: 51,
      indemnite: 11666.66,
      echelon: { groupe: "IV" }
    },
    expected: 22000
  },
  {
    title: "2k, 20ans d'anciennté, 51ans, groupe IV, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 240,
      age: 51,
      indemnite: 11666.66,
      echelon: { groupe: "IV" },
      hasOpe: true,
      isEco: true
    },
    expected: 24000
  },
  {
    title: "2k, 33ans d'anciennté, 55ans, groupe IV, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 396,
      age: 55,
      indemnite: 20333.33,
      echelon: { groupe: "IV" },
      hasOpe: true,
      isEco: true
    },
    expected: 36000
  }
];

const echelon5 = [
  {
    title: "2k, 12mois d'anciennté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 12,
      indemnite: 500,
      echelon: { groupe: "V" }
    },
    expected: 500
  },
  {
    title: "2k, 12mois d'anciennté, groupe V, OPE + licenciement eco",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 12,
      indemnite: 500,
      hasOpe: true,
      isEco: true,
      echelon: { groupe: "V" }
    },
    expected: 2000
  },
  {
    title: "2k, 2ans d'anciennté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 24,
      indemnite: 1000,
      echelon: { groupe: "V" }
    },
    expected: 1600
  },
  {
    title: "2k, 10ans d'anciennté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 120,
      indemnite: 5000,
      echelon: { groupe: "V" }
    },
    expected: 12000
  },
  {
    title: "2k, 20ans d'anciennté, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 240,
      indemnite: 11666.66,
      echelon: { groupe: "V" }
    },
    expected: 32000
  },
  {
    title: "2k, 10ans d'anciennté, 51ans, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 120,
      indemnite: 5000,
      age: 51,
      echelon: { groupe: "V" }
    },
    expected: 14000
  },
  {
    title: "2k, 10ans, 51ans, groupe V, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 120,
      indemnite: 5000,
      age: 51,
      echelon: { groupe: "V" },
      hasOpe: true,
      isEco: true
    },
    expected: 16000
  },
  {
    title: "2k, 20ans d'anciennté, 51ans, groupe V",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 240,
      age: 51,
      indemnite: 11666.66,
      echelon: { groupe: "V" }
    },
    expected: 34000
  },
  {
    title: "2k, 20ans d'anciennté, 51ans, groupe V, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 240,
      age: 51,
      indemnite: 11666.66,
      echelon: { groupe: "V" },
      hasOpe: true,
      isEco: true
    },
    expected: 36000
  },
  {
    title: "2k, 23ans d'anciennté, 55ans, groupe V, licenciement eco, OPE",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 396,
      age: 55,
      indemnite: 13666.66,
      echelon: { groupe: "V" }
    },
    expected: 40000
  }
];

describe("getIndemnite", () => {
  echelon123.concat(echelon4, echelon5).forEach(test => {
    it(`${test.title} should return ${test.expected}`, () => {
      const res = getIndemnite(test.data);
      expect(res.indemnite).toEqual(test.expected);
    });
  });
  it("should return 500 when anciennete > 12 && < 24", () => {
    const res = getIndemnite({
      ...echelon123[0].data,
      anciennete: 15
    });
    expect(res.indemnite).toEqual(500);
  });
});
