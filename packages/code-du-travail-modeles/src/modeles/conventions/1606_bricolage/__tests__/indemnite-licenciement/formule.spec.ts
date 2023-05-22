import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1606"
);

describe("Formule indemnité licenciement - 1606", () => {
  test.each`
    seniority  | expectedFormula    | expectedExplanations
    ${11 / 12} | ${""}              | ${[]}
    ${25 / 12} | ${"2% * Sref * A"} | ${["A : Ancienneté totale (≈ 2.08 ans : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${30}      | ${"2% * Sref * A"} | ${["A : Ancienneté totale (30 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule non-cadres $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1606'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle": `'Non-Cadres'`,
      });

      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );

  test.each`
    seniority  | age   | expectedFormula                                | expectedExplanations
    ${11 / 12} | ${38} | ${""}                                          | ${[]}
    ${25 / 12} | ${38} | ${"2% * Sref * A"}                             | ${["A : Ancienneté totale (≈ 2.08 ans : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${25 / 12} | ${50} | ${"(2% * Sref * A) + (50% * (2% * Sref * A))"} | ${["A : Ancienneté totale (≈ 2.08 ans : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${30}      | ${38} | ${"2% * Sref * A"}                             | ${["A : Ancienneté totale (30 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${30}      | ${50} | ${"(2% * Sref * A) + (50% * (2% * Sref * A))"} | ${["A : Ancienneté totale (30 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule cadres $expectedFormula avec $seniority an$s et age: age",
    ({ seniority, age, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1606'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle": `'Cadres'`,
        "contrat salarié . convention collective . bricolage . indemnité de licenciement . cadres . age":
          age,
      });

      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
