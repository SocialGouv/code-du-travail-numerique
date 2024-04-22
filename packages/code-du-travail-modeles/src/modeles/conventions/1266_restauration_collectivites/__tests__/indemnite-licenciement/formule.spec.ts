import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1266"
);

describe("Formule indemnité licenciement - CC 1266", () => {
  describe("Formule pour un non cadre", () => {
    test.each`
      seniority  | expectedFormula                             | expectedExplanations
      ${11 / 12} | ${""}                                       | ${[]}
      ${1}       | ${"(1/5 * Sref * A1)"}                      | ${["A1 : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${19}      | ${"(1/5 * Sref * A1) + (2/15 * Sref * A2)"} | ${["A1 : Ancienneté totale (19 ans)", "A2 : Années d'ancienneté au delà de 10 ans (9 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":
            "'Non-Cadres'",
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

  describe("Formule pour un cadre", () => {
    test.each`
      seniority  | expectedFormula                                                                       | expectedExplanations
      ${11 / 12} | ${""}                                                                                 | ${[]}
      ${1}       | ${"(1/5 * Sref * A1)"}                                                                | ${["A1 : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${6}       | ${"(1/5 * Sref * A1) + (1/15 * Sref * A2)"}                                           | ${["A1 : Ancienneté totale (6 ans)", "A2 : Années d'ancienneté au dessus de 5 ans jusqu'à 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${11}      | ${"(1/5 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3)"}                      | ${["A1 : Ancienneté totale (11 ans)", "A2 : Années d'ancienneté au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années d'ancienneté au dessus de 10 ans jusqu'à 15 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${18}      | ${"(1/5 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)"} | ${["A1 : Ancienneté totale (18 ans)", "A2 : Années d'ancienneté au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années d'ancienneté au dessus de 10 ans jusqu'à 15 ans (5 ans)", "A4 : Années d'ancienneté au delà de 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle":
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
  });
});
