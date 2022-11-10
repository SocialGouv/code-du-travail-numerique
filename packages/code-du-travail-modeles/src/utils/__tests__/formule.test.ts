import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../internal/merger";
import { getFormule } from "../formula";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Formula", () => {
  describe("Check formula for a CC (1501)", () => {
    test.each`
      category        | age   | seniority | expectedFormula                                                                                                                                                                      | expectedExplanations
      ${"Non-cadres"} | ${50} | ${13}     | ${"(1/10 * Sref * A1) + (1/15 * Sref * A2)"}                                                                                                                                         | ${["A1 : Ancienneté totale (13 ans)", "A2: Années d'ancienneté au-delà de 10 ans (3 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${50} | ${16.4}   | ${"(1/10 * Sref * A1) + (2/15 * Sref * A2)"}                                                                                                                                         | ${["A1 : Ancienneté totale (16.4 ans)", "A2: Années d'ancienneté au-delà de 10 ans (6.4 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${55} | ${13}     | ${"(1/10 * Sref * A1) + (1/15 * Sref * A2) + (15% * ((1/10 * Sref * A1) + (1/15 * Sref * A2)))"}                                                                                     | ${["A1 : Ancienneté totale (13 ans)", "A2: Années d'ancienneté au-delà de 10 ans (3 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${55} | ${16.4}   | ${"(1/10 * Sref * A1) + (2/15 * Sref * A2) + (15% * ((1/10 * Sref * A1) + (2/15 * Sref * A2)))"}                                                                                     | ${["A1 : Ancienneté totale (16.4 ans)", "A2: Années d'ancienneté au-delà de 10 ans (6.4 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${48} | ${19}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)"}                                                                                               | ${["A1 : Années de présence au total (19 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (5 ans)", "A4 : Années au dessus de 15 ans (4 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${48} | ${5}      | ${"1/10 * Sref * A"}                                                                                                                                                                 | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${51} | ${6}      | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2)"}                                                                                                                                         | ${["A1 : Années de présence au total (6 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (1 an)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${51} | ${12.2}   | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (15% * ((2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3)))"}                                           | ${["A1 : Années de présence au total (12.2 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (2.2 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${51} | ${23}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4) + (15% * ((2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)))"} | ${["A1 : Années de présence au total (23 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (5 ans)", "A4 : Années au dessus de 15 ans (8 ans)", "Sref : Salaire de référence (2300 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans, $category, $age ans",
      ({ category, seniority, age, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1501'",
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'Oui'`,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique . age":
            age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2300,
          "indemnité de licenciement": "oui",
        });
        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

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
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence": 2300,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2300,
          "indemnité de licenciement": "oui",
        });
        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
