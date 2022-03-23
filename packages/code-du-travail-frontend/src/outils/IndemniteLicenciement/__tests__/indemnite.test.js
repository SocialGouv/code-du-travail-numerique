import { getSalaireRef } from "../indemnite";

const tests = [
  {
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 2000,
    title: "2k",
  },
  {
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
    },
    expected: 4000,
    title: "4k",
  },
  {
    data: {
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 6000 })
        .fill({ salary: 2000 }, 1),
    },
    expected: 2333.3333333333335,
    title: "2k+6k",
  },
  {
    data: {
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 8000 })
        .fill({ salary: 4000 }, 1),
    },
    expected: 4333.333333333333,
    title: "4k+8k",
  },
  {
    data: {
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
    title: "prime + 3 mois plus favorable",
  },
];
describe("getSalaireRef", () => {
  tests.forEach((test) => {
    it(`${test.title} should return ${test.expected}`, () => {
      expect(getSalaireRef(test.data)).toEqual(test.expected);
    });
  });
});
