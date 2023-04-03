import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2614"
);

describe("Formule indemnité licenciement - 2614", () => {
  test.each`
    seniority | age   | expectedFormula                                                                                                        | expectedExplanations
    ${0}      | ${0}  | ${""}                                                                                                                  | ${[]}
    ${1.5}    | ${54} | ${""}                                                                                                                  | ${[]}
    ${15}     | ${54} | ${"(2.5 / 10 * Sref * A1)"}                                                                                            | ${["A1: Années d'ancienneté jusqu'à 15 ans d'ancienneté (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${24}     | ${54} | ${"(2.5 / 10 * Sref * A1) + (3.5 / 10 * Sref * A2)"}                                                                   | ${["A1: Années d'ancienneté jusqu'à 15 ans d'ancienneté (15 ans)", "A2: Années d'ancienneté pour les années au-delà de 15 ans d'ancienneté (9 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${1.5}    | ${59} | ${""}                                                                                                                  | ${[]}
    ${15}     | ${59} | ${"(2.5 / 10 * Sref * A1) + (10% * (2.5 / 10 * Sref * A1))"}                                                           | ${["A1: Années d'ancienneté jusqu'à 15 ans d'ancienneté (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${24}     | ${59} | ${"(2.5 / 10 * Sref * A1) + (3.5 / 10 * Sref * A2) + (10% * (2.5 / 10 * Sref * A1)) + (10% * (3.5 / 10 * Sref * A2))"} | ${["A1: Années d'ancienneté jusqu'à 15 ans d'ancienneté (15 ans)", "A2: Années d'ancienneté pour les années au-delà de 15 ans d'ancienneté (9 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${1.5}    | ${67} | ${""}                                                                                                                  | ${[]}
    ${15}     | ${67} | ${"(1.5 / 10 * Sref * A1) + (2.5 / 10 * Sref * A2)"}                                                                   | ${["A1: Années d'ancienneté jusqu'à 10 ans d'ancienneté (10 ans)", "A2: Années au-delà de 10 ans d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${24}     | ${67} | ${"(1.5 / 10 * Sref * A1) + (2.5 / 10 * Sref * A2)"}                                                                   | ${["A1: Années d'ancienneté jusqu'à 10 ans d'ancienneté (10 ans)", "A2: Années au-delà de 10 ans d'ancienneté (14 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et age $age",
    ({ seniority, age, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2614'",
        "contrat salarié . convention collective . travaux publics . age": age,
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
