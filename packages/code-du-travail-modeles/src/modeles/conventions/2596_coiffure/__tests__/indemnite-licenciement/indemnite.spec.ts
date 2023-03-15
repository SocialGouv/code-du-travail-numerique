import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2596"
);

describe("Indemnité conventionnel de licenciement pour la CC 2596", () => {
  test.each`
    seniority | salary  | expectedCompensation
    ${6 / 12} | ${2600} | ${0}
    ${8 / 12} | ${2600} | ${433.33}
    ${5}      | ${2600} | ${3250}
    ${15}     | ${2600} | ${10833.33}
  `(
    "Non-cadres: ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC2596'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
            "'Emplois techniques et de coiffeurs, emplois de l'esthétique-cosmétique et emplois non techniques'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.value).toEqual(expectedCompensation);
    }
  );
  test.each`
    seniority | salary  | expectedCompensation
    ${6 / 12} | ${2873} | ${359.13}
    ${9 / 12} | ${2873} | ${538.69}
    ${8}      | ${2877} | ${5754}
    ${20}     | ${2891} | ${14455}
    ${25}     | ${2891} | ${17346}
  `(
    "Cadres: ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC2596'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
            "'Cadres et agents de maitrise'",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.value).toEqual(expectedCompensation);
    }
  );
});
