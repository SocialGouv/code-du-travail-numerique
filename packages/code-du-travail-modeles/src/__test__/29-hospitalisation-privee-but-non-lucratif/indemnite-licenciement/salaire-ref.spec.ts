import {
  CategoryPro29,
  ReferenceSalary0029,
} from "../../../plugins/salaire-reference/29-hospitalisation-privee-but-non-lucratif";

const salaries1 = [
  {
    month: "janvier",
    value: 2400,
  },
  {
    month: "février",
    value: 2400,
  },
  {
    month: "mars",
    value: 2400,
  },
  {
    month: "avril",
    value: 2400,
  },
  {
    month: "mai",
    value: 2400,
  },
  {
    month: "juin",
    value: 2400,
  },
  {
    month: "juillet",
    value: 2400,
  },
  {
    month: "août",
    value: 2400,
  },
  {
    month: "septembre",
    value: 2400,
  },
  {
    month: "octobre",
    value: 2400,
  },
  {
    month: "novembre",
    value: 2400,
  },
  {
    month: "décembre",
    value: 2400,
  },
];

const salaries2 = [
  {
    month: "janvier",
    value: 2101,
  },
  {
    month: "février",
    value: 2305,
  },
  {
    month: "mars",
    value: 2129,
  },
  {
    month: "avril",
    value: 2175,
  },
  {
    month: "mai",
    value: 2304,
  },
  {
    month: "juin",
    value: 2406,
  },
  {
    month: "juillet",
    value: 2154,
  },
  {
    month: "août",
    value: 2247,
  },
  {
    month: "septembre",
    value: 2189,
  },
  {
    month: "octobre",
    value: 1900,
  },
  {
    month: "novembre",
    value: 2000,
  },
  {
    month: "décembre",
    value: 2100,
  },
];

describe("Calcul du salaire pour la CC 0029", () => {
  const ReferenceSalary = new ReferenceSalary0029();

  test.each`
    salaries     | professionalCategory       | bestSalariesTotal | expectedResult
    ${[]}        | ${CategoryPro29.other}     | ${undefined}      | ${0}
    ${salaries1} | ${CategoryPro29.other}     | ${undefined}      | ${2400}
    ${salaries1} | ${CategoryPro29.medic}     | ${undefined}      | ${2400}
    ${salaries2} | ${CategoryPro29.assistant} | ${undefined}      | ${2000}
    ${salaries2} | ${CategoryPro29.assistant} | ${12600}          | ${2100}
    ${salaries2} | ${CategoryPro29.assistant} | ${11000}          | ${2000}
  `(
    "Salaires : $salaries => $expectedResult €",
    ({ salaries, professionalCategory, bestSalariesTotal, expectedResult }) => {
      expect(
        ReferenceSalary.computeReferenceSalary({
          bestSalariesTotal,
          professionalCategory,
          salaires: salaries,
        })
      ).toEqual(expectedResult);
    }
  );
});
