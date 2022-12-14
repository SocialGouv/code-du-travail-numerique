import SingletonEnginePublicodes from "../../../../../internal/SingletonEngine";
import { getFormule } from "../../../../common";

describe("Formule indemnité licenciement - CC 1090", () => {
  const engine = SingletonEnginePublicodes.getInstance();

  test.each`
    seniority | expectedFormula                            | expectedExplanations
    ${7 / 12} | ${""}                                      | ${[]}
    ${8 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${7}      | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${12}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });
      const result = getFormule(situation);
      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
