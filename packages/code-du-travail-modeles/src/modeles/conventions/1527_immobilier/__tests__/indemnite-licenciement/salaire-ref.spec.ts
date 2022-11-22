import { ReferenceSalary1527 } from "../../salary";

const salaries1 = [
  {
    month: "janvier",
    value: 1990,
  },
  {
    month: "février",
    value: 1990,
  },
  {
    month: "mars",
    value: 1995,
  },
  {
    month: "avril",
    value: 1999,
  },
  {
    month: "mai",
    value: 2000,
  },
  {
    month: "juin",
    value: 2080,
  },
  {
    month: "juillet",
    value: 2500,
  },
  {
    month: "août",
    value: 2090,
  },
  {
    month: "septembre",
    value: 1900,
  },
  {
    month: "octobre",
    value: 2100,
  },
  {
    month: "novembre",
    value: 2100,
  },
  {
    month: "décembre",
    value: 2100,
  },
];

describe("Calcul du salaire pour la CC 1527", () => {
  const ReferenceSalary = new ReferenceSalary1527();

  test.each`
    salaries     | hasCommission | salaryContract | expectedResult
    ${[]}        | ${true}       | ${undefined}   | ${0}
    ${salaries1} | ${true}       | ${undefined}   | ${1911.076923076923}
    ${salaries1} | ${false}      | ${1990}        | ${1990}
  `(
    "Salaires : $salaries => $expectedResult €",
    ({ salaries, hasCommission, salaryContract, expectedResult }) => {
      expect(
        ReferenceSalary.computeReferenceSalary({
          hasCommission,
          salaires: salaries,
          salaryContract,
        })
      ).toEqual(expectedResult);
    }
  );
});
