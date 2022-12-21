import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getFormule } from "../../../../common";

describe("Indemnité légale de licenciement avec une formule personnalisée et expliquée pour la CC 2609", () => {
  const engine = new Engine(mergeIndemniteLicenciementModels());
  test.each`
    seniority  | age   | expectedFormula                                                                                                    | expectedExplanations
    ${2}       | ${50} | ${""}                                                                                                              | ${[]}
    ${25 / 12} | ${50} | ${"2.5 / 10 * Sref * A"}                                                                                           | ${["A : Ancienneté totale (≈ 2.08 ans : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${4}       | ${50} | ${"2.5 / 10 * Sref * A"}                                                                                           | ${["A : Ancienneté totale (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}      | ${50} | ${"2.5 / 10 * Sref * A"}                                                                                           | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${25}      | ${50} | ${"(2.5 / 10 * Sref * A1) + (3.5 / 10 * Sref * A2)"}                                                               | ${["A1 : Années d'ancienneté jusqu'à 15 ans d'ancienneté (15 ans)", "A2 : Années d'ancienneté au-delà de 15 ans d'ancienneté (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${25}      | ${50} | ${"(2.5 / 10 * Sref * A1) + (3.5 / 10 * Sref * A2)"}                                                               | ${["A1 : Années d'ancienneté jusqu'à 15 ans d'ancienneté (15 ans)", "A2 : Années d'ancienneté au-delà de 15 ans d'ancienneté (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${35}      | ${54} | ${"10 * Sref"}                                                                                                     | ${["Sref : Salaire de référence (1000 €)"]}
    ${2}       | ${58} | ${""}                                                                                                              | ${[]}
    ${25 / 12} | ${58} | ${"(2.5 / 10 * Sref * A) + (10% * (2.5 / 10 * Sref * A))"}                                                         | ${["A : Ancienneté totale (≈ 2.08 ans : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${4}       | ${58} | ${"(2.5 / 10 * Sref * A) + (10% * (2.5 / 10 * Sref * A))"}                                                         | ${["A : Ancienneté totale (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}      | ${58} | ${"(2.5 / 10 * Sref * A) + (10% * (2.5 / 10 * Sref * A))"}                                                         | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${25}      | ${58} | ${"((2.5 / 10 * Sref * A1) + (3.5 / 10 * Sref * A2)) + (10% * ((2.5 / 10 * Sref * A1) + (3.5 / 10 * Sref * A2)))"} | ${["A1 : Années d'ancienneté jusqu'à 15 ans d'ancienneté (15 ans)", "A2 : Années d'ancienneté au-delà de 15 ans d'ancienneté (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${2}       | ${66} | ${""}                                                                                                              | ${[]}
    ${25 / 12} | ${66} | ${"1.5 / 10 * Sref * A"}                                                                                           | ${["A : Ancienneté totale (≈ 2.08 ans : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${4}       | ${66} | ${"1.5 / 10 * Sref * A"}                                                                                           | ${["A : Ancienneté totale (4 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}      | ${66} | ${"(1.5 / 10 * Sref * A1) + (2.5 / 10 * Sref * A2)"}                                                               | ${["A1 : Années d'ancienneté jusqu'à 10 ans d'ancienneté (10 ans)", "A2 : Années d'ancienneté pour les années au-delà de 10 ans d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${25}      | ${66} | ${"(1.5 / 10 * Sref * A1) + (2.5 / 10 * Sref * A2)"}                                                               | ${["A1 : Années d'ancienneté jusqu'à 10 ans d'ancienneté (10 ans)", "A2 : Années d'ancienneté pour les années au-delà de 10 ans d'ancienneté (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${50}      | ${66} | ${"8 * Sref"}                                                                                                      | ${["Sref : Salaire de référence (1000 €)"]}
  `(
    "Ancienneté: $seniority ans, catégorie: $category, age: $age, droit à la retraite: $haveRightToRetirement => $expectedFormula",
    ({ seniority, age, expectedFormula, expectedExplanations }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . convention collective . batiment etam . indemnité de licenciement . age à la fin de son préavis": age,
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });

      const formule = getFormule(situation);

      expect(formule.formula).toEqual(expectedFormula);
      expect(formule.explanations).toEqual(expectedExplanations);
    }
  );
});
