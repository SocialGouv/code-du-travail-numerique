import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3127"
);

describe("Formule indemnité licenciement - 3127", () => {
  test.each`
    seniority  | expectedFormula                             | expectedExplanations
    ${11 / 12} | ${""}                                       | ${[]}
    ${1}       | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${7}       | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}      | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11}      | ${"(1/5 * Sref * A1) + (2/15 * Sref * A2)"} | ${["A1 : Ancienneté totale (11 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${12}      | ${"(1/5 * Sref * A1) + (2/15 * Sref * A2)"} | ${["A1 : Ancienneté totale (12 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC3127'",
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
