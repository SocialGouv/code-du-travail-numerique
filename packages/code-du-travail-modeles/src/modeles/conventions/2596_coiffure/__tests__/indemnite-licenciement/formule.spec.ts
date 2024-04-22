import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2596"
);

describe("Formule indemnité licenciement - 2596", () => {
  test.each`
    seniority | expectedFormula      | expectedExplanations
    ${1 / 12} | ${"1/4 * Sref * A1"} | ${["A : Ancienneté totale (≈ 0.08 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${8 / 12} | ${"1/4 * Sref * A1"} | ${["A : Ancienneté totale (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${2}      | ${"1/4 * Sref * A1"} | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}     | ${"1/4 * Sref * A1"} | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${30}     | ${"6 * Sref"}        | ${["Sref : Salaire de référence (1000 €)"]}
  `(
    "Cadres : formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });

      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );

  test.each`
    seniority | expectedFormula                            | expectedExplanations
    ${1 / 12} | ${""}                                      | ${[]}
    ${8 / 12} | ${"1/4 * Sref * A1"}                       | ${["A1 : Ancienneté de 10 ans ou moins (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${2}      | ${"1/4 * Sref * A1"}                       | ${["A1 : Ancienneté de 10 ans ou moins (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${30}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (20 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Non-cadres : formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Emplois techniques et de coiffeurs'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });

      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
