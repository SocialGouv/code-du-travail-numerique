import getIndemnite from "../indemnite";

const tests = [
  {
    title: "2k, 15m, pas de date",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(2000)
      },
      primes: 0,
      anciennete: 15
    },
    expected: 625
  },
  {
    title: "4k, 15 ans, pas de date",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(4000)
      },
      primes: 0,
      anciennete: 180
    },
    expected: 16666.666666666664
  },
  {
    title: "2k, 15m, pas de date, faute grave",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(2000)
      },
      primes: 0,
      fauteGrave: true,
      anciennete: 15
    },
    expected: 0
  },
  {
    title: "4k, 15m, pas de date, faute grave",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(4000)
      },
      primes: 0,
      fauteGrave: true,
      anciennete: 15
    },
    expected: 0
  },
  {
    title: "2k, 15m, 2018-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(2000)
      },
      primes: 0,
      anciennete: 15,
      isR12342: false
    },
    expected: 625
  },
  {
    title: "2k, 15m, 2016-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(2000)
      },
      primes: 0,
      anciennete: 15,
      isR12342: true
    },
    expected: 500
  },
  {
    title: "4k, 25m, 2018-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(4000)
      },
      primes: 0,
      anciennete: 25,
      isR12342: false
    },
    expected: 2083.3333333333335
  },
  {
    title: "4k, 25m, 2016-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(4000)
      },
      primes: 0,
      anciennete: 25,
      isR12342: true
    },
    expected: 1666.6666666666667
  },
  {
    title: "2k+4k, 15m, 2018-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(2000)
      },
      primes: 4000,
      anciennete: 15,
      isR12342: false
    },
    expected: 729.1666666666666
  },
  {
    title: "2k+4k, 15m, 2016-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(2000)
      },
      primes: 4000,
      anciennete: 15,
      isR12342: true
    },
    expected: 583.3333333333334
  },
  {
    title: "4k+4k, 25m, 2018-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(4000)
      },
      primes: 4000,
      anciennete: 25,
      isR12342: false
    },
    expected: 2256.9444444444443
  },
  {
    title: "1500, 12ans 9mois, 2016-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(1500)
      },
      primes: 0,
      anciennete: 12 * 12 + 9,
      isR12342: true
    },
    expected: 4375
  },
  {
    title: "4k+4k, 25 ans, 2016-10-22",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(4000)
      },
      primes: 4000,
      anciennete: 25 * 12,
      isR12342: true
    },
    expected: 30333.333333333336
  },
  {
    title: "2k, 15m, pas de date, 10m tps plein, 5mois tps partiel",
    data: {
      salaires: {
        isPartiel: true,
        periods: [
          {
            type: "temps-plein",
            duree: 10,
            salaire: 2000
          },
          {
            type: "temps-partiel",
            duree: 5,
            salaire: 1000
          }
        ]
      },
      primes: 0,
      anciennete: 15
    },
    expected: 520.8333333333333
  },
  {
    title: "2k, 15m, 2018-10-22, inaptitude",
    data: {
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(2000)
      },
      primes: 0,
      anciennete: 15,
      isR12342: false,
      inaptitude: true
    },
    expected: 1250
  },
  {
    title: "2k, 15m, pas de date, 10m tps plein, 5mois tps partiel, inaptitude",
    data: {
      salaires: {
        isPartiel: true,
        periods: [
          {
            type: "temps-plein",
            duree: 10,
            salaire: 2000
          },
          {
            type: "temps-partiel",
            duree: 5,
            salaire: 1000
          }
        ]
      },
      inaptitude: true,
      primes: 0,
      anciennete: 15
    },
    expected: 1041.6666666666665
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
  it("should return indemnite when anciennete >= 8", () => {
    const res = getIndemnite({
      ...tests[0].data,
      salaires: {
        isPartiel: false,
        periods: [],
        derniersMois: Array.from({ length: 12 }).fill(1500)
      },
      anciennete: 8
    });
    expect(res.indemnite).toEqual(250);
  });
  it("should return 0 when anciennete < 12", () => {
    const res = getIndemnite({
      ...tests[0].data,
      anciennete: 11,
      isR12342: true
    });
    expect(res.indemnite).toEqual(0);
  });
});
