import { getIndemnite, round, getSalaireRef } from "../indemnite";

const tests = [
  {
    title: "2k, 15m, 2019-01-01",
    data: {
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      hasTempsPartiel: false,
      anciennete: 15 / 12,
      dateNotification: "2019-01-01"
    },
    expected: 625
  },
  {
    title: "4k, 15 ans, 2019-01-01",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
      anciennete: 15,
      dateNotification: "2019-01-01"
    },
    expected: 16666.666666666664
  },
  {
    title: "2k, 15m, 2018-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      anciennete: 15 / 12,
      dateNotification: "2018-10-22"
    },
    expected: 625
  },
  {
    title: "2k, 15m, 2016-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      anciennete: 15 / 12,
      dateNotification: "2016-10-22"
    },
    expected: 500
  },
  {
    title: "4k, 25m, 2018-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
      anciennete: 25 / 12,
      dateNotification: "2018-10-22"
    },
    expected: 2083.3333333333335
  },
  {
    title: "4k, 25m, 2016-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
      anciennete: 25 / 12,
      dateNotification: "2016-10-22"
    },
    expected: 1666.6666666666667
  },
  {
    title: "2k+4k, 15m, 2018-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 })
        .fill({ salary: 6000 })
        .fill({ salary: 2000 }, 1),
      primes: [{ prime: 4000 }],
      anciennete: 15 / 12,
      dateNotification: "2018-10-22"
    },
    expected: 729.1666666666666
  },
  {
    title: "2k+4k, 15m, 2016-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 })
        .fill({ salary: 6000 })
        .fill({ salary: 2000 }, 1),
      primes: [{ prime: 4000 }],
      anciennete: 15 / 12,
      dateNotification: "2016-10-22"
    },
    expected: 583.3333333333334
  },
  {
    title: "4k+4k, 25m, 2018-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 })
        .fill({ salary: 8000 })
        .fill({ salary: 4000 }, 1),
      primes: [{ prime: 4000 }],
      anciennete: 25 / 12,
      dateNotification: "2018-10-22"
    },
    expected: 2256.9444444444443
  },
  {
    title: "1500, 12ans 9mois, 2016-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 1500 }),
      anciennete: 12 + 9 / 12,
      dateNotification: "2016-10-22"
    },
    expected: 4375
  },
  {
    title: "4k+4k, 25 ans, 2016-10-22",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 })
        .fill({ salary: 8000 })
        .fill({ salary: 4000 }, 1),
      primes: [{ prime: 4000 }],
      anciennete: 25,
      dateNotification: "2016-10-22"
    },
    expected: 30333.333333333336
  },
  {
    title: "2k, 15m, 2019-01-01, 10m tps plein, 5mois tps partiel",
    data: {
      hasTempsPartiel: true,
      salairePeriods: [
        {
          type: "temps-plein",
          duration: 10,
          salary: 2000
        },
        {
          type: "temps-partiel",
          duration: 5,
          salary: 1000
        }
      ],
      anciennete: 15 / 12,
      dateNotification: "2019-01-01"
    },
    expected: 520.8333333333333
  },
  {
    title: "2k, 15m, 2018-10-22, inaptitude",
    data: {
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
      anciennete: 15 / 12,
      dateNotification: "2018-10-22",
      inaptitude: true
    },
    expected: 1250
  },
  {
    title: "2k, 15m, 2019-01-01, 10m tps plein, 5mois tps partiel, inaptitude",
    data: {
      hasTempsPartiel: true,
      salairePeriods: [
        {
          type: "temps-plein",
          duration: 10,
          salary: 2000
        },
        {
          type: "temps-partiel",
          duration: 5,
          salary: 1000
        }
      ],
      dateNotification: "2019-01-01",
      inaptitude: true,
      anciennete: 15 / 2
    },
    expected: 1041.6666666666665
  },
  {
    title:
      "2k, 10ans, 2019-01-01, 60m tps plein, 60mois tps partiel + congé parental",
    data: {
      contrat: "cdi",
      inaptitude: false,
      fauteGrave: false,
      hasAbsenceProlonge: true,
      dateEntree: "2008-01-01",
      dateSortie: "2018-02-01",
      dateNotification: "2017-11-01",
      absencePeriods: [
        {
          type: "Congé parental d'éducation",
          duration: 2
        }
      ],
      anciennete: 10.07638888888889,
      hasTempsPartiel: true,
      salairePeriods: [
        {
          type: "Temps plein",
          duration: "20",
          salary: "2000"
        },
        {
          type: "Temps partiel",
          duration: "20",
          salary: "1000"
        },
        {
          type: "Temps plein",
          duration: "20",
          salary: "1600"
        },
        {
          type: "Temps partiel",
          salary: "1000",
          duration: "20"
        },
        {
          type: "Temps plein",
          duration: "20",
          salary: "2000"
        },
        {
          type: "Temps partiel",
          duration: "20",
          salary: "1000"
        }
      ]
    },
    expected: 3592.38
  }
];
describe("getIndemnite", () => {
  tests.forEach(test => {
    it(`${test.title} should return ${test.expected}`, () => {
      const salaireRef = getSalaireRef(test.data);
      const res = getIndemnite({ salaireRef, ...test.data });
      expect(res.indemniteLegale).toEqual(round(test.expected));
    });
  });
  it("should return 0 when anciennete < 8mois", () => {
    const res = getIndemnite({
      ...tests[0].data,
      anciennete: 7 / 12
    });
    expect(res.indemniteLegale).toEqual(0);
  });
  it("should return 0 when anciennete < 12mois", () => {
    const res = getIndemnite({
      ...tests[0].data,
      anciennete: 11 / 12,
      dateNotification: "2017-01-01"
    });
    expect(res.indemniteLegale).toEqual(0);
  });
});
