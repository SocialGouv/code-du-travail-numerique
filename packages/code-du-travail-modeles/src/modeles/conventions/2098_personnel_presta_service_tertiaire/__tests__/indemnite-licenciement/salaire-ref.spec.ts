import { ReferenceSalary2098 } from "../../salary";

describe("Calcul du salaire pour la CC 2098", () => {
  const ReferenceSalary = new ReferenceSalary2098();
  const salaries = [
    { month: "janvier", value: 2800 },
    { month: "février", value: 2800 },
    { month: "mars", value: 2800 },
    { month: "avril", value: 2800 },
    { month: "mai", value: 2800 },
    { month: "juin", value: 2800 },
    { month: "juillet", value: 2800 },
    { month: "août", value: 2800 },
    { month: "septembre", value: 2800 },
    { month: "octobre", value: 3100 },
    { month: "novembre", value: 3100 },
    { month: "décembre", value: 3100 },
  ];
  describe("Licenciement pour inaptitude totale et définitive non consécutive à un accident du travail", () => {
    test.each`
      salariesInput | category          | expectedResult
      ${[]}         | ${"'Non-cadres'"} | ${0}
      ${salaries}   | ${"'Non-cadres'"} | ${3100}
      ${salaries}   | ${"'Cadres'"}     | ${3100}
    `(
      "Nombre de salaires : $salariesInput.length (avec variable: $category) => $expectedResult €",
      ({ salariesInput, category, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: category,
            inabilityNonProfessional: true,
            salaires: salariesInput,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Autre licenciement", () => {
    test.each`
      salariesInput | category          | expectedResult
      ${[]}         | ${"'Non-cadres'"} | ${0}
      ${salaries}   | ${"'Non-cadres'"} | ${3100}
      ${salaries}   | ${"'Cadres'"}     | ${2875}
    `(
      "Salaires : $salaries (avec category: $category) => $expectedResult €",
      ({ salariesInput, category, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            category: category,
            inabilityNonProfessional: false,
            salaires: salariesInput,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
