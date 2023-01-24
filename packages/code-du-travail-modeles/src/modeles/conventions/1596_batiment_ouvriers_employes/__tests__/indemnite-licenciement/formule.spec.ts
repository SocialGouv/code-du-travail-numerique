import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1596"
);

describe("Formule indemnité licenciement - 1596", () => {
  test.each`
    age   | seniority  | expectedFormula                                                                          | expectedExplanations
    ${32} | ${23 / 12} | ${""}                                                                                    | ${[]}
    ${58} | ${23 / 12} | ${""}                                                                                    | ${[]}
    ${32} | ${2}       | ${"1/10 * Sref * A"}                                                                     | ${["A : Années d'ancienneté (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${2}       | ${"(1/10 * Sref * A) + (1/100 * Sref * A)"}                                              | ${["A : Années d'ancienneté (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${5}       | ${"1/10 * Sref * A"}                                                                     | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${5}       | ${"(1/10 * Sref * A) + (1/100 * Sref * A)"}                                              | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${6}       | ${"(3/20 * Sref * A1)"}                                                                  | ${["A1 : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${6}       | ${"(3/20 * Sref * A1) + (3/200 * Sref * A1)"}                                            | ${["A1 : Années d'ancienneté (6 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${32} | ${16}      | ${"(3/20 * Sref * A1) + (1/20 * Sref * A2)"}                                             | ${["A1 : Années d'ancienneté (16 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
    ${58} | ${16}      | ${"(3/20 * Sref * A1) + (1/20 * Sref * A2) + (3/200 * Sref * A1) + (1/200 * Sref * A2)"} | ${["A1 : Années d'ancienneté (16 ans)", "A2 : Années d'ancienneté au-delà de 15 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans et seniority : $seniority, et age $âge",
    ({ age, seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1596'",
        "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age": age,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });

      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
