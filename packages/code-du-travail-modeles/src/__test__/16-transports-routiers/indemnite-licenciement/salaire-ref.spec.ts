import { ReferenceSalary16 } from "../../../plugins/salaire-reference/16_transports_routiers";

describe("Calcul du salaire pour la CC 16", () => {
  const ReferenceSalary = new ReferenceSalary16();
  describe("Pour Ingénieur et cadre", () => {
    const engineerSalaries = [
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
      { month: "décembre", value: 3374 },
    ];

    test.each`
      salaries            | hasVariablePay | expectedResult
      ${[]}               | ${false}       | ${0}
      ${engineerSalaries} | ${false}       | ${3374}
      ${engineerSalaries} | ${true}        | ${3238}
    `(
      "Salaires : $salaries (avec variable: $hasVariablePay) => $expectedResult €",
      ({ salaries, hasVariablePay, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: "'Ingénieurs et cadres'",
            hasVariablePay,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Pour un TAM", () => {
    const tamSalaries = [
      { month: "janvier", value: 2688 },
      { month: "février", value: 2522 },
      { month: "mars", value: 2645 },
      { month: "avril", value: 2552 },
      { month: "mai", value: 2827 },
      { month: "juin", value: 2686 },
      { month: "juillet", value: 2827 },
      { month: "août", value: 2766 },
      { month: "septembre", value: 2742 },
      { month: "octobre", value: 2555 },
      { month: "novembre", value: 2504 },
      { month: "décembre", value: 2738 },
    ];

    test.each`
      salaries       | hasVariablePay | expectedResult
      ${[]}          | ${false}       | ${0}
      ${tamSalaries} | ${false}       | ${2738}
      ${tamSalaries} | ${true}        | ${2671}
    `(
      "Salaires : $salaries (avec variable: $hasVariablePay) => $expectedResult €",
      ({ salaries, hasVariablePay, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: "'TAM'",
            hasVariablePay,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Pour un Employé", () => {
    const employeesSalaries = [
      { month: "janvier", value: 2451 },
      { month: "février", value: 2522 },
      { month: "mars", value: 2444 },
      { month: "avril", value: 2432 },
      { month: "mai", value: 2585 },
      { month: "juin", value: 2583 },
      { month: "juillet", value: 2443 },
      { month: "août", value: 2410 },
      { month: "septembre", value: 2537 },
      { month: "octobre", value: 2428 },
      { month: "novembre", value: 2434 },
      { month: "décembre", value: 2551 },
    ];

    test.each`
      salaries             | expectedResult
      ${[]}                | ${0}
      ${employeesSalaries} | ${2471}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: "'Employés'",
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Pour un Ouvrier (autres licenciements)", () => {
    const workerSalaries = [
      { month: "janvier", value: 2404 },
      { month: "février", value: 2540 },
      { month: "mars", value: 2487 },
      { month: "avril", value: 2410 },
      { month: "mai", value: 2403 },
      { month: "juin", value: 2591 },
      { month: "juillet", value: 2525 },
      { month: "août", value: 2412 },
      { month: "septembre", value: 2411 },
      { month: "octobre", value: 2460 },
      { month: "novembre", value: 2486 },
      { month: "décembre", value: 2602 },
    ];

    test.each`
      salaries          | expectedResult
      ${[]}             | ${0}
      ${workerSalaries} | ${2516}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: "'Ouvriers'",
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Pour un Ouvrier (Incapacité temporaire à la conduite)", () => {
    const workerSalaries = [
      { month: "janvier", value: 2600 },
      { month: "février", value: 2600 },
      { month: "mars", value: 2600 },
      { month: "avril", value: 2600 },
      { month: "mai", value: 2600 },
      { month: "juin", value: 2600 },
      { month: "juillet", value: 2600 },
      { month: "août", value: 2600 },
      { month: "septembre", value: 2600 },
      { month: "octobre", value: 2600 },
      { month: "novembre", value: 2600 },
      { month: "décembre", value: 2600 },
    ];

    test.each`
      salaries          | expectedResult
      ${[]}             | ${0}
      ${workerSalaries} | ${2600}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: "'Ouvriers'",
            driveInability: "temporary",
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Pour un Ouvrier (Incapacité définitive à la conduite)", () => {
    const workerSalaries = [
      { month: "janvier", value: 2553 },
      { month: "février", value: 2510 },
      { month: "mars", value: 2561 },
      { month: "avril", value: 2416 },
      { month: "mai", value: 2420 },
      { month: "juin", value: 2480 },
      { month: "juillet", value: 2404 },
      { month: "août", value: 2450 },
      { month: "septembre", value: 2478 },
      { month: "octobre", value: 2500 },
      { month: "novembre", value: 2579 },
      { month: "décembre", value: 2490 },
    ];

    test.each`
      salaries          | expectedResult
      ${[]}             | ${0}
      ${workerSalaries} | ${2523}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: "'Ouvriers'",
            driveInability: "definitive",
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
