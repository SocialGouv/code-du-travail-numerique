import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../internal/merger";
import { getFormule } from "../../../common";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée", () => {
  const engine = new Engine(mergeIndemniteLicenciementModels());

  test.each`
    seniority | isForInaptitude | expectedFormula                                  | expectedExplanations
    ${7 / 12} | ${"non"}        | ${""}                                            | ${[]}
    ${7 / 12} | ${"oui"}        | ${"(1/4 * Sref * A) * 2"}                        | ${["A : Ancienneté totale (≈ 0.58 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${8 / 12} | ${"non"}        | ${"1/4 * Sref * A"}                              | ${["A : Ancienneté totale (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${8 / 12} | ${"oui"}        | ${"(1/4 * Sref * A) * 2"}                        | ${["A : Ancienneté totale (≈ 0.67 an : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${7}      | ${"oui"}        | ${"(1/4 * Sref * A) * 2"}                        | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${7}      | ${"non"}        | ${"1/4 * Sref * A"}                              | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"oui"}        | ${"(1/4 * Sref * A) * 2"}                        | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${10}     | ${"non"}        | ${"1/4 * Sref * A"}                              | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${12}     | ${"oui"}        | ${"((1/4 * Sref * A1) + (1/3 * Sref * A2)) * 2"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${12}     | ${"non"}        | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}       | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${11.5}   | ${"non"}        | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}       | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1.5 an)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et inaptitude $isForInaptitude",
    ({ seniority, isForInaptitude, expectedFormula, expectedExplanations }) => {
      const situation = engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année": seniority,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": isForInaptitude,
        "contrat salarié . indemnité de licenciement . salaire de référence": 1000,
      });

      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
