import getIndemnite from "./indemnite";

const tests = [
  {
    title: "2k, 15m, pas de date",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 15
    },
    expected: 625
  },
  {
    title: "4k, 15m, pas de date",
    data: {
      salaires: Array.from({ length: 12 }).fill(4000),
      primes: 0,
      anciennete: 15
    },
    expected: 1250
  },
  {
    title: "2k, 15m, pas de date, faute grave",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      fauteGrave: true,
      anciennete: 15
    },
    expected: 0
  },
  {
    title: "4k, 15m, pas de date, faute grave",
    data: {
      salaires: Array.from({ length: 12 }).fill(4000),
      primes: 0,
      fauteGrave: true,
      anciennete: 15
    },
    expected: 0
  },
  {
    title: "2k, 15m, 2018-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 15,
      dateFinContrat: "2018-10-22"
    },
    expected: 625
  },
  {
    title: "2k, 15m, 2016-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 0,
      anciennete: 15,
      dateFinContrat: "2016-10-22"
    },
    expected: 500
  },
  {
    title: "4k, 25m, 2018-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(4000),
      primes: 0,
      anciennete: 25,
      dateFinContrat: "2018-10-22"
    },
    expected: 2083.3333333333335
  },
  {
    title: "4k, 25m, 2016-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(4000),
      primes: 0,
      anciennete: 25,
      dateFinContrat: "2016-10-22"
    },
    expected: 1666.6666666666667
  },
  {
    title: "2k+4k, 15m, 2018-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 4000,
      anciennete: 15,
      dateFinContrat: "2018-10-22"
    },
    expected: 729.1666666666666
  },
  {
    title: "2k+4k, 15m, 2016-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(2000),
      primes: 4000,
      anciennete: 15,
      dateFinContrat: "2016-10-22"
    },
    expected: 583.3333333333334
  },
  {
    title: "4k+4k, 25m, 2018-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(4000),
      primes: 4000,
      anciennete: 25,
      dateFinContrat: "2018-10-22"
    },
    expected: 2256.9444444444443
  },
  {
    title: "4k+4k, 25m, 2016-10-22",
    data: {
      salaires: Array.from({ length: 12 }).fill(4000),
      primes: 4000,
      anciennete: 25,
      dateFinContrat: "2016-10-22"
    },
    expected: 1805.5555555555554
  }
];
describe("getIndemnite", () => {
  tests.forEach(test => {
    it(`${test.title} should return ${test.expected}`, () => {
      const res = getIndemnite(test.data);
      expect(res.indemnite).toEqual(test.expected);
    });
  });
  it("should return 0 when anciennete < 0", () => {
    const res = getIndemnite({
      ...tests[0].data,
      anciennete: 0
    });
    expect(res.indemnite).toEqual(0);
  });
  it("should return 0 when anciennete < 12", () => {
    const res = getIndemnite({
      ...tests[0].data,
      anciennete: 11
    });
    expect(res.indemnite).toEqual(0);
  });
});
