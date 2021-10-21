import { getIndemnite, getSalaireRef, round } from "../indemnite";

const tests = [
  {
    data: {
      anciennete: 15 / 12,
      dateNotification: "2019-01-01",
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 625,
    title: "2k, 15m, 2019-01-01",
  },
  {
    data: {
      anciennete: 15,
      dateNotification: "2019-01-01",
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
    },
    expected: 16666.666666666664,
    title: "4k, 15 ans, 2019-01-01",
  },
  {
    data: {
      anciennete: 15 / 12,
      dateNotification: "2018-10-22",
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 625,
    title: "2k, 15m, 2018-10-22",
  },
  {
    data: {
      anciennete: 15 / 12,
      dateNotification: "2016-10-22",
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 500,
    title: "2k, 15m, 2016-10-22",
  },
  {
    data: {
      anciennete: 25 / 12,
      dateNotification: "2018-10-22",
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
    },
    expected: 2083.3333333333335,
    title: "4k, 25m, 2018-10-22",
  },
  {
    data: {
      anciennete: 25 / 12,
      dateNotification: "2016-10-22",
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 4000 }),
    },
    expected: 1666.6666666666667,
    title: "4k, 25m, 2016-10-22",
  },
  {
    data: {
      anciennete: 15 / 12,
      dateNotification: "2018-10-22",
      hasTempsPartiel: false,
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 6000 })
        .fill({ salary: 2000 }, 1),
    },
    expected: 729.1666666666666,
    title: "2k+4k, 15m, 2018-10-22",
  },
  {
    data: {
      anciennete: 15 / 12,
      dateNotification: "2016-10-22",
      hasTempsPartiel: false,
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 6000 })
        .fill({ salary: 2000 }, 1),
    },
    expected: 583.3333333333334,
    title: "2k+4k, 15m, 2016-10-22",
  },
  {
    data: {
      anciennete: 25 / 12,
      dateNotification: "2018-10-22",
      hasTempsPartiel: false,
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 8000 })
        .fill({ salary: 4000 }, 1),
    },
    expected: 2256.9444444444443,
    title: "4k+4k, 25m, 2018-10-22",
  },
  {
    data: {
      anciennete: 12 + 9 / 12,
      dateNotification: "2016-10-22",
      hasTempsPartiel: false,
      salaires: Array.from({ length: 12 }).fill({ salary: 1500 }),
    },
    expected: 4375,
    title: "1500, 12ans 9mois, 2016-10-22",
  },
  {
    data: {
      anciennete: 25,
      dateNotification: "2016-10-22",
      hasTempsPartiel: false,
      primes: [{ prime: 4000 }],
      salaires: Array.from({ length: 12 })
        .fill({ salary: 8000 })
        .fill({ salary: 4000 }, 1),
    },
    expected: 30333.333333333336,
    title: "4k+4k, 25 ans, 2016-10-22",
  },
  {
    data: {
      anciennete: 26 / 12,
      dateNotification: "2018-10-22",
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
    expected: 1105.9,
    title: "prime + 3 mois plus favorable, 26m, 2018-10-22",
  },
  {
    data: {
      anciennete: 15 / 12,
      dateNotification: "2019-01-01",
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
    expected: 520.8333333333333,
    title: "2k, 15m, 2019-01-01, 10m tps plein, 5mois tps partiel",
  },
  {
    data: {
      anciennete: 15 / 12,
      dateNotification: "2018-10-22",
      hasTempsPartiel: false,
      inaptitude: true,
      salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
    },
    expected: 1250,
    title: "2k, 15m, 2018-10-22, inaptitude",
  },
  {
    data: {
      anciennete: 15 / 2,
      dateNotification: "2019-01-01",
      hasTempsPartiel: true,
      inaptitude: true,
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
    expected: 1041.6666666666665,
    title: "2k, 15m, 2019-01-01, 10m tps plein, 5mois tps partiel, inaptitude",
  },
  {
    data: {
      absencePeriods: [
        {
          duration: 2,
          type: "Congé parental d'éducation",
        },
      ],
      anciennete: 10.07638888888889,
      contrat: "cdi",
      dateEntree: "2008-01-01",
      dateNotification: "2017-11-01",
      dateSortie: "2018-02-01",
      fauteGrave: false,
      hasAbsenceProlonge: true,
      hasTempsPartiel: true,
      inaptitude: false,
      salairePeriods: [
        {
          duration: "20",
          salary: "2000",
          type: "Temps plein",
        },
        {
          duration: "20",
          salary: "1000",
          type: "Temps partiel",
        },
        {
          duration: "20",
          salary: "1600",
          type: "Temps plein",
        },
        {
          duration: "20",
          salary: "1000",
          type: "Temps partiel",
        },
        {
          duration: "20",
          salary: "2000",
          type: "Temps plein",
        },
        {
          duration: "20",
          salary: "1000",
          type: "Temps partiel",
        },
      ],
    },
    expected: 3592.38,
    title:
      "2k, 10ans, 2019-01-01, 60m tps plein, 60mois tps partiel + congé parental",
  },
];
describe("getIndemnite", () => {
  tests.forEach((test) => {
    it(`${test.title} should return ${test.expected}`, () => {
      const salaireRef = getSalaireRef(test.data);
      const res = getIndemnite({ salaireRef, ...test.data });
      expect(res.indemniteLegale).toEqual(round(test.expected));
    });
  });
  it("should return 0 when anciennete < 8mois", () => {
    const res = getIndemnite({
      ...tests[0].data,
      anciennete: 7 / 12,
    });
    expect(res.indemniteLegale).toEqual(0);
  });
  it("should return 0 when anciennete < 12mois", () => {
    const res = getIndemnite({
      ...tests[0].data,
      anciennete: 11 / 12,
      dateNotification: "2017-01-01",
    });
    expect(res.indemniteLegale).toEqual(0);
  });
});
