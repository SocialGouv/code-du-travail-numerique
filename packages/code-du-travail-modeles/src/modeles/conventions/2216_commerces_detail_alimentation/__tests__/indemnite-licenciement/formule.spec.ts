import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getFormule } from "../../../../common";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 2216", () => {
  const engine = new Engine(mergeIndemniteLicenciementModels());

  test.each`
    category                                          | isEconomicFiring | age   | seniority | expectedFormula                                                                                                                                                                      | expectedExplanations                                                                                                                                                                                                                                                                                                      | expectedAnnotations
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${8 / 12} | ${"1/4 * Sref * A"}                                                                                                                                                                  | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${[]}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${8 / 12} | ${"1/4 * Sref * A"}                                                                                                                                                                  | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${[]}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${8 / 12} | ${"1/4 * Sref * A + (20% * (1/4 * Sref * A))"}                                                                                                                                       | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${["20% : majoration pour motif économique"]}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}                                                                                                                                           | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                    | ${[]}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}                                                                                                                                           | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                    | ${[]}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2) + (20% * ((1/4 * Sref * A1) + (1/3 * Sref * A2)))"}                                                                                         | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                    | ${["20% : majoration pour motif économique"]}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${8 / 12} | ${"1/4 * Sref * A"}                                                                                                                                                                  | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${[]}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${8 / 12} | ${"1/4 * Sref * A"}                                                                                                                                                                  | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${[]}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${8 / 12} | ${"1/4 * Sref * A + (20% * (1/4 * Sref * A))"}                                                                                                                                       | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${["20% : majoration pour motif économique"]}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}                                                                                                                                           | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                    | ${[]}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"}                                                                                                                                           | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                    | ${[]}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${11}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2) + (20% * ((1/4 * Sref * A1) + (1/3 * Sref * A2)))"}                                                                                         | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                    | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${false}         | ${50} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Cadres"}                                       | ${true}          | ${50} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Cadres"}                                       | ${true}          | ${51} | ${0}      | ${""}                                                                                                                                                                                | ${[]}                                                                                                                                                                                                                                                                                                                     | ${[]}
    ${"Cadres"}                                       | ${false}         | ${50} | ${8 / 12} | ${"1/4 * Sref * A"}                                                                                                                                                                  | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${[]}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12} | ${"1/4 * Sref * A + (20% * (1/4 * Sref * A))"}                                                                                                                                       | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${true}          | ${51} | ${8 / 12} | ${"1/4 * Sref * A + (20% * (1/4 * Sref * A))"}                                                                                                                                       | ${["A : Ancienneté totale (≈0.67 an: valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                          | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${false}         | ${50} | ${8}      | ${"3/10 * Sref * A"}                                                                                                                                                                 | ${["A : Ancienneté total (8 ans)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                                               | ${[]}
    ${"Cadres"}                                       | ${true}          | ${49} | ${8}      | ${"3/10 * Sref * A"}                                                                                                                                                                 | ${["A : Ancienneté total (8 ans)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                                               | ${[]}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8}      | ${"(3/10 * Sref * A) + (20% * (3/10 * Sref * A))"}                                                                                                                                   | ${["A : Ancienneté total (8 ans)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                                               | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${true}          | ${51} | ${8}      | ${"(3/10 * Sref * A) + (20% * (3/10 * Sref * A))"}                                                                                                                                   | ${["A : Ancienneté total (8 ans)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                                                                                                                               | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${false}         | ${50} | ${11}     | ${"(3/10 * Sref * A1) + (4/10 * Sref * A2)"}                                                                                                                                         | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                           | ${[]}
    ${"Cadres"}                                       | ${true}          | ${50} | ${11}     | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2)) + (20% * ((3/10 * Sref * A1) + (4/10 * Sref * A2)))"}                                                                                   | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                           | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${true}          | ${51} | ${11}     | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2)) + (20% * ((3/10 * Sref * A1) + (4/10 * Sref * A2)))"}                                                                                   | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}                                                                                                                                           | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${false}         | ${50} | ${22}     | ${"(3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)"}                                                                                                                    | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (10 ans)", "A3 : Années de présence pour la tranche de 20 à 40 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}                                                                       | ${[]}
    ${"Cadres"}                                       | ${true}          | ${50} | ${22}     | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)) + (20% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)))"}                                         | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (10 ans)", "A3 : Années de présence pour la tranche de 20 à 40 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}                                                                       | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${true}          | ${51} | ${22}     | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)) + (20% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)))"}                                         | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (10 ans)", "A3 : Années de présence pour la tranche de 20 à 40 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}                                                                       | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${false}         | ${50} | ${44}     | ${"(3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (1/3 * Sref * A4)"}                                                                                                | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (10 ans)", "A3 : Années de présence pour la tranche de 20 à 40 ans (20 ans)", "A4 : Années de présence pour la tranche au-delà de 40 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]} | ${[]}
    ${"Cadres"}                                       | ${true}          | ${50} | ${44}     | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (1/3 * Sref * A4)) + (20% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (1/3 * Sref * A4)))"} | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (10 ans)", "A3 : Années de présence pour la tranche de 20 à 40 ans (20 ans)", "A4 : Années de présence pour la tranche au-delà de 40 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]} | ${["20% : majoration pour motif économique"]}
    ${"Cadres"}                                       | ${true}          | ${51} | ${44}     | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (1/3 * Sref * A4)) + (20% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (1/3 * Sref * A4)))"} | ${["A1 : Années de présence pour la tranche jusqu'à 10 ans (10 ans)", "A2 : Années de présence pour la tranche de 10 à 20 ans (10 ans)", "A3 : Années de présence pour la tranche de 20 à 40 ans (20 ans)", "A4 : Années de présence pour la tranche au-delà de 40 ans (4 ans)", "Sref : Salaire de référence (1000 €)"]} | ${["20% : majoration pour motif économique"]}
  `(
    "Catégorie $category, age $age ans, séniorité $seniority ans & licenciement économique: $isEconomicFiring, formule $expectedFormula",
    ({
      category,
      seniority,
      expectedFormula,
      expectedExplanations,
      expectedAnnotations,
      age,
      isEconomicFiring,
    }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique": isEconomicFiring
          ? `'Oui'`
          : `'Non'`,
        "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique . age": age,
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });
      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
      expect(result.annotations).toEqual(expectedAnnotations);
    }
  );
});
