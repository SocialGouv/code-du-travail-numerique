import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-indemnite-licenciement.json";
import { getFormule } from "../../../../common";

const engine = new Engine(modeles as any);

describe("Formule indemnité licenciement - 1501", () => {
  describe("Autres licenciements", () => {
    test.each`
      category        | seniority  | expectedFormula                                                                        | expectedExplanations
      ${"Non-cadres"} | ${1}       | ${""}                                                                                  | ${[]}
      ${"Non-cadres"} | ${3}       | ${"1/10 * Sref * A"}                                                                   | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${15}      | ${"(1/10 * Sref * A1) + (1/15 * Sref * A2)"}                                           | ${["A1 : Ancienneté totale (15 ans)", "A2: Années d'ancienneté au-delà de 10 ans (5 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${17}      | ${"(1/10 * Sref * A1) + (2/15 * Sref * A2)"}                                           | ${["A1 : Ancienneté totale (17 ans)", "A2: Années d'ancienneté au-delà de 10 ans (7 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${11 / 12} | ${""}                                                                                  | ${[]}
      ${"Cadres"}     | ${1}       | ${"1/10 * Sref * A"}                                                                   | ${["A : Ancienneté totale (1 an)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${5}       | ${"1/10 * Sref * A"}                                                                   | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${23}      | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)"} | ${["A1 : Années de présence au total (23 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (5 ans)", "A4 : Années au dessus de 15 ans (8 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${13.67}   | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3)"}                      | ${["A1 : Années de présence au total (13.67 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (3.67 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${9}       | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2)"}                                           | ${["A1 : Années de présence au total (9 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (4 ans)", "Sref : Salaire de référence (2300 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans, $category",
      ({ category, seniority, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1501'",
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'Oui'`,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique . age": 42,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2300,
        });
        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Licenciement économique", () => {
    test.each`
      category        | age   | seniority | expectedFormula                                                                                                                                                                      | expectedExplanations
      ${"Non-cadres"} | ${50} | ${7}      | ${"1/10 * Sref * A"}                                                                                                                                                                 | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${50} | ${13}     | ${"(1/10 * Sref * A1) + (1/15 * Sref * A2)"}                                                                                                                                         | ${["A1 : Ancienneté totale (13 ans)", "A2: Années d'ancienneté au-delà de 10 ans (3 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${50} | ${16}     | ${"(1/10 * Sref * A1) + (2/15 * Sref * A2)"}                                                                                                                                         | ${["A1 : Ancienneté totale (16 ans)", "A2: Années d'ancienneté au-delà de 10 ans (6 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${55} | ${7}      | ${"1/10 * Sref * A"}                                                                                                                                                                 | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${55} | ${13}     | ${"(1/10 * Sref * A1) + (1/15 * Sref * A2) + (15% * ((1/10 * Sref * A1) + (1/15 * Sref * A2)))"}                                                                                     | ${["A1 : Ancienneté totale (13 ans)", "A2: Années d'ancienneté au-delà de 10 ans (3 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Non-cadres"} | ${55} | ${16}     | ${"(1/10 * Sref * A1) + (2/15 * Sref * A2) + (15% * ((1/10 * Sref * A1) + (2/15 * Sref * A2)))"}                                                                                     | ${["A1 : Ancienneté totale (16 ans)", "A2: Années d'ancienneté au-delà de 10 ans (6 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${48} | ${19}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)"}                                                                                               | ${["A1 : Années de présence au total (19 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (5 ans)", "A4 : Années au dessus de 15 ans (4 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${51} | ${5}      | ${"1/10 * Sref * A"}                                                                                                                                                                 | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${51} | ${10}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (15% * ((2/10 * Sref * A1) + (1/15 * Sref * A2)))"}                                                                                     | ${["A1 : Années de présence au total (10 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${51} | ${12}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (15% * ((2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3)))"}                                           | ${["A1 : Années de présence au total (12 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (2 ans)", "Sref : Salaire de référence (2300 €)"]}
      ${"Cadres"}     | ${51} | ${23}     | ${"(2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4) + (15% * ((2/10 * Sref * A1) + (1/15 * Sref * A2) + (2/15 * Sref * A3) + (3/15 * Sref * A4)))"} | ${["A1 : Années de présence au total (23 ans)", "A2 : Années au dessus de 5 ans jusqu'à 10 ans (5 ans)", "A3 : Années au dessus de 10 ans jusqu'à 15 ans (5 ans)", "A4 : Années au dessus de 15 ans (8 ans)", "Sref : Salaire de référence (2300 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans, $category, $age ans",
      ({ category, seniority, age, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1501'",
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'Oui'`,
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique . age": age,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2300,
        });
        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
