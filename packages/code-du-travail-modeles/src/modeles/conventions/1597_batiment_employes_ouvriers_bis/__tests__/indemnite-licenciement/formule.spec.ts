import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getFormule } from "../../../../common";

describe("Formule indemnité licenciement - 1597", () => {
  const engine = new Engine(mergeIndemniteLicenciementModels());

  test.each`
    age   | seniority  | expectedFormula                                                                                  | expectedExplanations
    ${32} | ${23 / 12} | ${""}                                                                                            | ${[]}
    ${58} | ${23 / 12} | ${""}                                                                                            | ${[]}
    ${32} | ${2}       | ${"1/10 * Sref * A"}                                                                             | ${["A : Années d'ancienneté (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${2}       | ${"(1/10 * Sref * A) + (10% * (1/10 * Sref * A))"}                                               | ${["A : Années d'ancienneté (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${5}       | ${"1/10 * Sref * A"}                                                                             | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${5}       | ${"(1/10 * Sref * A) + (10% * (1/10 * Sref * A))"}                                               | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${6}       | ${"3/20 * Sref * A"}                                                                             | ${["A : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${6}       | ${"(3/20 * Sref * A) + (10% * (3/20 * Sref * A))"}                                               | ${["A : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${16}      | ${"(3/20 * Sref * A1) + (1/20 * Sref * A2)"}                                                     | ${["A1 : Années d'ancienneté (16 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${16}      | ${"(3/20 * Sref * A1) + (1/20 * Sref * A2) + (10% * ((3/20 * Sref * A1) + (1/20 * Sref * A2)))"} | ${["A1 : Années d'ancienneté (16 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et age : $age",
    ({ age, seniority, expectedFormula, expectedExplanations }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1597'",
        "contrat salarié . convention collective . batiment ouvriers employés bis . indemnité de licenciement . age": age,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
      });

      const result = getFormule(situation);
      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
