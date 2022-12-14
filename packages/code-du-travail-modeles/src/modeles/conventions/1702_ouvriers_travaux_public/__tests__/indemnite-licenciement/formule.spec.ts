import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getFormule } from "../../../../common";

describe("Formule indemnité licenciement - 1702", () => {
  const engine = new Engine(mergeIndemniteLicenciementModels());

  test.each`
    seniority | age   | salaireRef | expectedFormula                                                                                    | expectedExplanations
    ${3}      | ${54} | ${2700}    | ${"1/10 * Sref * A"}                                                                               | ${["A : Années d'ancienneté (3 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${5}      | ${54} | ${2700}    | ${"1/10 * Sref * A"}                                                                               | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${6}      | ${54} | ${2700}    | ${"3/20 * Sref * A"}                                                                               | ${["A : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${27}     | ${54} | ${2700}    | ${"(3/20 * Sref * A1) + (1/20 * Sref * A2)"}                                                       | ${["A1 : Années d'ancienneté (27 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (12 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${3}      | ${57} | ${2700}    | ${"(1/10 * Sref * A) + (10% * (1/10 * Sref * A))"}                                                 | ${["A : Années d'ancienneté (3 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${5}      | ${57} | ${2700}    | ${"(1/10 * Sref * A) + (10% * (1/10 * Sref * A))"}                                                 | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${6}      | ${57} | ${2700}    | ${"(3/20 * Sref * A) + (10% * (3/20 * Sref * A))"}                                                 | ${["A : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${27}     | ${57} | ${2700}    | ${"((3/20 * Sref * A1) + (1/20 * Sref * A2)) + (10% * ((3/20 * Sref * A1) + (1/20 * Sref * A2)))"} | ${["A1 : Années d'ancienneté (27 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (12 ans)", "Sref : Salaire de référence (2700 €)"]}
  `(
    "Autre licenciement: Formule avec ancienneté: $seniority ans et age : $age",
    ({ age, seniority, salaireRef, expectedFormula, expectedExplanations }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1702'",
        "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age": age,
        "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Non'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
      });
      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );

  test.each`
    seniority | age   | salaireRef | expectedFormula                                                                                                     | expectedExplanations
    ${3}      | ${54} | ${2700}    | ${"(1/10 * Sref * A) + (70% * (1/10 * Sref * A))"}                                                                  | ${["A : Années d'ancienneté (3 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${5}      | ${54} | ${2700}    | ${"(1/10 * Sref * A) + (35% * Sref)"}                                                                               | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${6}      | ${54} | ${2700}    | ${"(1/10 * Sref * A) + (35% * Sref)"}                                                                               | ${["A : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${27}     | ${54} | ${2700}    | ${"((3/20 * Sref * A1) + (1/20 * Sref * A2)) + (35% * Sref)"}                                                       | ${["A1 : Années d'ancienneté (27 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (12 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${3}      | ${57} | ${2700}    | ${"((1/10 * Sref * A) + (10% * (1/10 * Sref * A))) + (70% * (1/10 * Sref * A))"}                                    | ${["A : Années d'ancienneté (3 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${5}      | ${57} | ${2700}    | ${"((1/10 * Sref * A) + (10% * (1/10 * Sref * A))) + (35% * Sref)"}                                                 | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${6}      | ${57} | ${2700}    | ${"((3/20 * Sref * A) + (10% * (3/20 * Sref * A))) + (35% * Sref)"}                                                 | ${["A : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (2700 €)"]}
    ${27}     | ${57} | ${2700}    | ${"(((3/20 * Sref * A1) + (1/20 * Sref * A2)) + (10% * ((3/20 * Sref * A1) + (1/20 * Sref * A2)))) + (35% * Sref)"} | ${["A1 : Années d'ancienneté (27 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (12 ans)", "Sref : Salaire de référence (2700 €)"]}
  `(
    "Licenciement éco: Formule avec $seniority ans et age : $age",
    ({ age, seniority, salaireRef, expectedFormula, expectedExplanations }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1702'",
        "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age": age,
        "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Oui'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
      });
      const result = getFormule(situation);

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
