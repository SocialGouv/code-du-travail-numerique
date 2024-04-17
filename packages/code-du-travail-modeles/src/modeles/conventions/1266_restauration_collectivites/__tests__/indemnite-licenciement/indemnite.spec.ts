import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1266"
);

describe("Calcul de l'indemnité de licenciement - CC 1266", () => {
  describe("Calcul pour un non cadre", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation
      ${11 / 12}     | ${1}      | ${2500}    | ${0}
      ${1}           | ${1}      | ${2500}    | ${500}
      ${1}           | ${19}     | ${2500}    | ${12500}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1266'",
            "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":
              "'Non-Cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Calcul pour un cadre", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation
      ${11 / 12}     | ${1}      | ${3500}    | ${0}
      ${1}           | ${1}      | ${3500}    | ${700}
      ${1}           | ${6}      | ${3500}    | ${4433.33}
      ${1}           | ${11}     | ${3500}    | ${9333.33}
      ${1}           | ${18}     | ${3500}    | ${18200}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1266'",
            "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });
});
