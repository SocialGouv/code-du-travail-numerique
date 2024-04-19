import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1740"
);

describe("CC 1740", () => {
  describe("Formule indemnité licenciement", () => {
    test.each`
      seniorityRight | seniority | age   | expectedFormula                                                                                                | expectedExplanations
      ${1}           | ${1}      | ${54} | ${""}                                                                                                          | ${[]}
      ${1.99}        | ${2}      | ${54} | ${""}                                                                                                          | ${[]}
      ${2}           | ${2}      | ${54} | ${"(1 / 10 * Sref * A)"}                                                                                       | ${["A : Années d'ancienneté (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${5}      | ${54} | ${"(1 / 10 * Sref * A)"}                                                                                       | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${8}      | ${54} | ${"(3 / 20 * Sref * A1)"}                                                                                      | ${["A1 : Années d'ancienneté depuis la première année dans l'entreprise (8 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${15}     | ${54} | ${"(3 / 20 * Sref * A1)"}                                                                                      | ${["A1 : Années d'ancienneté depuis la première année dans l'entreprise (15 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${26}     | ${54} | ${"(3 / 20 * Sref * A1) + (1 / 20 * Sref * A2)"}                                                               | ${["A1 : Années d'ancienneté depuis la première année dans l'entreprise (26 ans)", "A2 : Années d'ancienneté au delà de 15 ans (11 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${1}           | ${1}      | ${59} | ${""}                                                                                                          | ${[]}
      ${1.99}        | ${2}      | ${59} | ${""}                                                                                                          | ${[]}
      ${2}           | ${2}      | ${59} | ${"(1 / 10 * Sref * A) + (10% * (1 / 10 * Sref * A))"}                                                         | ${["A : Années d'ancienneté (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${5}      | ${59} | ${"(1 / 10 * Sref * A) + (10% * (1 / 10 * Sref * A))"}                                                         | ${["A : Années d'ancienneté (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${8}      | ${59} | ${"(3 / 20 * Sref * A1) + (10% * (3 / 20 * Sref * A1))"}                                                       | ${["A1 : Années d'ancienneté depuis la première année dans l'entreprise (8 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${15}     | ${59} | ${"(3 / 20 * Sref * A1) + (10% * (3 / 20 * Sref * A1))"}                                                       | ${["A1 : Années d'ancienneté depuis la première année dans l'entreprise (15 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${2}           | ${26}     | ${59} | ${"(3 / 20 * Sref * A1) + (1 / 20 * Sref * A2) + (10% * (3 / 20 * Sref * A1)) + (10% * (1 / 20 * Sref * A2))"} | ${["A1 : Années d'ancienneté depuis la première année dans l'entreprise (26 ans)", "A2 : Années d'ancienneté au delà de 15 ans (11 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Avec une ancienneté $seniority ans, age: $age => $expectedFormula",
      ({
        age,
        expectedFormula,
        expectedExplanations,
        seniority,
        seniorityRight,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1740'",
            "contrat salarié . convention collective . ouvriers bâtiment région parisienne . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "1000",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const result = engine.getFormule();

        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
