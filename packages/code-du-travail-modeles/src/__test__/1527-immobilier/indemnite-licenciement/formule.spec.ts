import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { getFormule } from "../../../utils";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 1527", () => {
  test.each`
    seniority | expectedFormula                            | expectedExplanations
    ${7 / 12} | ${""}                                      | ${[]}
    ${8 / 12} | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (1000 €)"]}
    ${7}      | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Années d'ancienneté pour les 10 premières années (10 ans)", "A2 : Années d'ancienneté à partir de la 11ème année (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${12}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Années d'ancienneté pour les 10 premières années (10 ans)", "A2 : Années d'ancienneté à partir de la 11ème année (2 ans)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et age : $age",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      const engine = new Engine(mergeIndemniteLicenciementModels());

      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1527'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence": 1000,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });
      const result = getFormule(situation);
      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
