import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2596"
);

describe("Indemnité conventionnel de licenciement pour la CC 2596", () => {
  test.each`
    seniorityRight | seniority | salary  | expectedCompensation
    ${6 / 12}      | ${6 / 12} | ${2600} | ${0}
    ${6 / 12}      | ${8 / 12} | ${2600} | ${0}
    ${8 / 12}      | ${8 / 12} | ${2600} | ${433.33}
    ${8 / 12}      | ${5}      | ${2600} | ${3250}
    ${8 / 12}      | ${5}      | ${2600} | ${3250}
    ${8 / 12}      | ${15}     | ${2600} | ${10833.33}
  `(
    "Non-cadres: ancienneté: $seniority an, ancienneté requise : $seniorityRight an,  salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, expectedCompensation }) => {
      [
        "'Emplois techniques et de coiffeurs'",
        "'Emplois de l'esthétique-cosmétique'",
        "'Emplois non techniques'",
      ].forEach((catPro) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2596'",
            "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
              catPro,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      });
    }
  );
  test.each`
    seniorityRight | seniority | salary  | expectedCompensation
    ${0}           | ${6 / 12} | ${2873} | ${359.13}
    ${0}           | ${9 / 12} | ${2873} | ${538.69}
    ${0}           | ${8}      | ${2877} | ${5754}
    ${0}           | ${20}     | ${2891} | ${14455}
    ${0}           | ${25}     | ${2891} | ${17346}
  `(
    "Cadres: ancienneté: $seniority an, ancienneté requise : $seniorityRight an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, seniorityRight, salary, expectedCompensation }) => {
      ["'Cadres'", "'Agents de maîtrise'"].forEach((catPro) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2596'",
            "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
              catPro,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      });
    }
  );
});
