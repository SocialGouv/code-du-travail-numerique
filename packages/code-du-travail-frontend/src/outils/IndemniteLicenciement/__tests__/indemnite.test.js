import { getSalaireRef } from "../indemnite";

const tests = [
  {
    data: {
      anciennete: 15 / 12,
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 2000,
    title: "2k, 15m",
  },
  {
    data: {
      anciennete: 15,
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
    },
    expected: 4000,
    title: "4k, 15 ans",
  },
  {
    data: {
      anciennete: 15 / 12,
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 2000,
    title: "2k, 15m, 2018-10-22",
  },
  {
    data: {
      anciennete: 25 / 12,
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
    },
    expected: 4000,
    title: "4k, 25m, 2018-10-22",
  },
  {
    data: {
      anciennete: 15 / 12,
      hasTempsPartiel: false,
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 6000 })
        .fill({ salary: 2000 }, 1),
    },
    expected: 2333.3333333333335,
    title: "2k+4k, 15m",
  },
  {
    data: {
      anciennete: 25 / 12,
      hasTempsPartiel: false,
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 8000 })
        .fill({ salary: 4000 }, 1),
    },
    expected: 4333.333333333333,
    title: "4k+4k, 25m",
  },
  {
    data: {
      anciennete: 25,
      hasTempsPartiel: false,
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 8000 })
        .fill({ salary: 4000 }, 1),
    },
    expected: 4333.333333333333,
    title: "4k+4k, 25 ans",
  },
  {
    data: {
      anciennete: 26 / 12,
      hasTempsPartiel: false,
      primes: [{ prime: 2500 }],
      salaires: [
        { salary: 3000 },
        { salary: 2500 },
        { salary: 2500 },
        { salary: 1700 },
        { salary: 1700 },
        { salary: 1700 },
        { salary: 1700 },
        { salary: 2500 },
        { salary: 1700 },
        { salary: 1700 },
        { salary: 1700 },
        { salary: 1700 },
      ],
    },
    expected: 2041.6666666666665,
    title: "prime + 3 mois plus favorable, 26m",
  },
  {
    data: {
      anciennete: 15 / 12,
      hasTempsPartiel: true,
      salairePeriods: [
        {
          duration: 10,
          salary: 2000,
          type: "temps-plein",
        },
        {
          duration: 5,
          salary: 1000,
          type: "temps-partiel",
        },
      ],
    },
    expected: 1666.666666666667,
    title: "2k, 15m, 2019-01-01, 10m tps plein, 5mois tps partiel",
  },
];
describe("getSalaireRef", () => {
  tests.forEach((test) => {
    it(`${test.title} should return ${test.expected}`, () => {
      expect(getSalaireRef(test.data)).toEqual(test.expected);
    });
  });
});
