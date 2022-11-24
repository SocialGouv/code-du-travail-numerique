import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../internal/merger";
import { getFormule } from "../formula";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Formula", () => {
  describe("Check formula for CC when fold back to legal", () => {
    test.each`
      seniority | inaptitude | expectedFormula                                  | expectedExplanations
      ${5}      | ${"non"}   | ${"1/4 * Sref * A"}                              | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${5}      | ${"oui"}   | ${"(1/4 * Sref * A) * 2"}                        | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${1 / 12} | ${"oui"}   | ${""}                                            | ${[]}
      ${16.4}   | ${"non"}   | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}       | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (6.4 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${16.4}   | ${"oui"}   | ${"((1/4 * Sref * A1) + (1/3 * Sref * A2)) * 2"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (6.4 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${1 / 12} | ${"oui"}   | ${""}                                            | ${[]}
    `(
      "Avec une séniorité de $seniority ans et inaptitude $inaptitude : $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations, inaptitude }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1090'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence": 2300,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2300,
        });
        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
