import { ReferenceSalary1672 } from "../../salary";

describe("Calcul du salaire pour la CC 1672", () => {
  const ReferenceSalary = new ReferenceSalary1672();
  const engineerSalaries = [
    { month: "janvier", value: 2512 },
    { month: "février", value: 2752 },
    { month: "mars", value: 2756 },
    { month: "avril", value: 2718 },
    { month: "mai", value: 2882 },
    { month: "juin", value: 2574 },
    { month: "juillet", value: 2842 },
    { month: "août", value: 2650 },
    { month: "septembre", value: 2566 },
    { month: "octobre", value: 2859 },
    { month: "novembre", value: 2794 },
    { month: "décembre", value: 2471 },
  ];
  const engineerSalariesWithPrime = [
    { month: "janvier", value: 3202 },
    { month: "février", value: 3002 },
    { month: "mars", value: 3157 },
    { month: "avril", value: 3192 },
    { month: "mai", value: 3101 },
    { month: "juin", value: 3326 },
    { month: "juillet", value: 3316 },
    { month: "août", value: 3343 },
    { month: "septembre", value: 3173 },
    { month: "octobre", value: 3379 },
    { month: "novembre", value: 3291 },
    { month: "décembre", prime: 1000, value: 3374 },
  ];

  test.each`
    salaries                     | expectedResult
    ${[]}                        | ${0}
    ${engineerSalaries}          | ${32376}
    ${engineerSalariesWithPrime} | ${39856}
  `(
    "Salaires : $salaries => $expectedResult €",
    ({ salaries, expectedResult }) => {
      expect(
        ReferenceSalary.computeReferenceSalary({
          salaires: salaries,
        })
      ).toEqual(expectedResult);
    }
  );
});
