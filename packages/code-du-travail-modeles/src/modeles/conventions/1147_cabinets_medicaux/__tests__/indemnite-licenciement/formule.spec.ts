import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1147"
);

describe("Formule indemnité licenciement - CC 1147", () => {
  test.each`
    seniority | expectedFormula                             | expectedExplanations
    ${0.67}   | ${""}                                       | ${[]}
    ${1}      | ${""}                                       | ${[]}
    ${1.08}   | ${"1 / 5 * Sref * A1"}                      | ${["A1 : Années d'ancienneté au total (1.08 an)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"1 / 5 * Sref * A1"}                      | ${["A1 : Années d'ancienneté au total (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11}     | ${"1 / 5 * Sref * A1 + 2 / 15 * Sref * A2"} | ${["A1 : Années d'ancienneté au total (11 ans)", "A2 : Années d'ancienneté au delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1147'",
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
