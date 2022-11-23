import { ReferenceSalary2609 } from "../../salary";

describe("Calcul du salaire pour la CC 2609", () => {
  const ReferenceSalary = new ReferenceSalary2609();

  const inputSalaries = [
    { month: "janvier", value: 2566 },
    { month: "février", value: 2446 },
    { month: "mars", value: 2452 },
    { month: "avril", value: 2566 },
    { month: "mai", value: 2658 },
    { month: "juin", value: 2690 },
    { month: "juillet", value: 2602 },
    { month: "août", value: 2420 },
    { month: "septembre", value: 2622 },
    { month: "octobre", value: 2420 },
    { month: "novembre", value: 2492 },
    { month: "décembre", value: 2450 },
  ];

  test.each`
    salaries         | hasVariablePay | expectedResult
    ${[]}            | ${false}       | ${0}
    ${inputSalaries} | ${false}       | ${2450}
    ${inputSalaries} | ${true}        | ${4982}
  `(
    "Salaires : $salaries.length (avec variable: $hasVariablePay) => $expectedResult €",
    ({ salaries, hasVariablePay, expectedResult }) => {
      expect(
        ReferenceSalary.computeReferenceSalary({
          hasVariablePay,
          salaires: salaries,
        })
      ).toEqual(expectedResult);
    }
  );
});
