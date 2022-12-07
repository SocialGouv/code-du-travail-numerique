import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getFormule } from "../../../../common";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 3127", () => {
  test.each`
    seniority  | expectedFormula                             | expectedExplanations
    ${11 / 12} | ${""}                                       | ${[]}
    ${1}       | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${7}       | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}      | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11}      | ${"(1/5 * Sref * A1) + (2/15 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${12}      | ${"(1/5 * Sref * A1) + (2/15 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const engine = new Engine(mergeIndemniteLicenciementModels());

      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC3127'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });
      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
