import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../internal/merger";
import { getFormule } from "../formula";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Formula", () => {
  describe("Check formula for 1501", () => {
    test.each`
      category        | age   | seniority | expectedFormula                                                                                                                                                                      | expectedExplanations
      ${"Non-cadres"} | ${50} | ${13}     | ${"(1/10 * Sref * A1) + (1/15 * Sref * A2)"}                                                                                                                                         | ${["A1 : Ancienneté totale (13)", "A2: Années d'ancienneté au-delà de 10 ans (3)", "Sref : Salaire de référence (2300)"]}
      ${"Non-cadres"} | ${50} | ${16}     | ${"(1/10 * Sref * A1) + (2/15 * Sref * A2)"}                                                                                                                                         | ${["A1 : Ancienneté totale (16)", "A2: Années d'ancienneté au-delà de 10 ans (6)", "Sref : Salaire de référence (2300)"]}
      ${"Non-cadres"} | ${55} | ${13}     | ${"(1/10 * Sref * A1) + (1/15 * Sref * A2) + (15% * ((1/10 * Sref * A1) + (1/15 * Sref * A2)))"}                                                                                     | ${["A1 : Ancienneté totale (13)", "A2: Années d'ancienneté au-delà de 10 ans (3)", "Sref : Salaire de référence (2300)"]}
      ${"Non-cadres"} | ${55} | ${16}     | ${"(1/10 * Sref * A1) + (2/15 * Sref * A2) + (15% * ((1/10 * Sref * A1) + (2/15 * Sref * A2)))"}                                                                                     | ${["A1 : Ancienneté totale (16)", "A2: Années d'ancienneté au-delà de 10 ans (6)", "Sref : Salaire de référence (2300)"]}
      ${"Cadres"}     | ${48} | ${19}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)"}                                                                                               | ${["A1 : Années de présence au total (19)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (5)", "A4 : Années au dessus de 15 ans (4)", "Sref : Salaire de référence (2300)"]}
      ${"Cadres"}     | ${48} | ${5}      | ${"1/10 * Sref * A"}                                                                                                                                                                 | ${["A : Ancienneté totale (5)", "Sref : Salaire de référence (2300)"]}
      ${"Cadres"}     | ${51} | ${6}      | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)"}                                                                                               | ${["A1 : Années de présence au total (6)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (1)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (0)", "A4 : Années au dessus de 15 ans (0)", "Sref : Salaire de référence (2300)"]}
      ${"Cadres"}     | ${51} | ${12}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4) + (15% * ((2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)))"} | ${["A1 : Années de présence au total (12)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (2)", "A4 : Années au dessus de 15 ans (0)", "Sref : Salaire de référence (2300)"]}
      ${"Cadres"}     | ${51} | ${23}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4) + (15% * ((2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)))"} | ${["A1 : Années de présence au total (23)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (5)", "A4 : Années au dessus de 15 ans (8)", "Sref : Salaire de référence (2300)"]}
    `(
      "Formule $expectedFormula avec $seniority ans, $category, $age ans",
      ({ category, seniority, age, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1501'",
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle . licenciement économique": `'Oui'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
            age,
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
