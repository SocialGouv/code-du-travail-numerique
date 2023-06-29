import { QuestionOuiNon } from "../../../../common";
import { ReferenceSalary2120 } from "../../salary";

describe("Calcul du salaire pour la CC 2120", () => {
  const ReferenceSalary = new ReferenceSalary2120();
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
  describe("Licenciement pour motif economique", () => {
    test.each`
      salariesInput | expectedResult
      ${[]}         | ${0}
      ${salaries}   | ${2875}
    `(
      "Nombre de salaires : $salariesInput.length => $expectedResult €",
      ({ salariesInput, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            isLicenciementDisciplinaire: QuestionOuiNon.non,
            isLicenciementEco: QuestionOuiNon.oui,
            salaires: salariesInput,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Licenciement pour motif non disciplinaire", () => {
    test.each`
      salariesInput | expectedResult
      ${[]}         | ${0}
      ${salaries}   | ${3100}
    `(
      "Nombre de salaires : $salariesInput.length => $expectedResult €",
      ({ salariesInput, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            isLicenciementDisciplinaire: QuestionOuiNon.oui,
            isLicenciementEco: QuestionOuiNon.non,
            salaires: salariesInput,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Ni l'un ni l'autre", () => {
    test.each`
      salariesInput | expectedResult
      ${[]}         | ${0}
      ${salaries}   | ${2653.846153846154}
    `(
      "Nombre de salaires : $salariesInput.length => $expectedResult €",
      ({ salariesInput, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            isLicenciementDisciplinaire: QuestionOuiNon.non,
            isLicenciementEco: QuestionOuiNon.non,
            salaires: salariesInput,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
