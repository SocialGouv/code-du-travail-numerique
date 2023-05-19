import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1483"
);

describe("Formule indemnité licenciement - 1483", () => {
  describe("Pour un non-cadres", () => {
    test.each`
      seniorityRight | seniority | expectedFormula                                | expectedExplanations
      ${1}           | ${0}      | ${""}                                          | ${[]}
      ${1}           | ${1}      | ${""}                                          | ${[]}
      ${1.01}        | ${8}      | ${"(1 / 5 * Sref * A1)"}                       | ${["A1: Années de présence dès la première année (8 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${1.01}        | ${10}     | ${"(1 / 5 * Sref * A1)"}                       | ${["A1: Années de présence dès la première année (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${1.01}        | ${18}     | ${"(1 / 5 * Sref * A1) + (1 / 3 * Sref * A2)"} | ${["A1: Années de présence dès la première année (10 ans)", "A2: Années de présence à partir de 10 ans de présence (8 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "ancienneté: $seniority an, => $expectedFormula",
      ({
        seniority,
        seniorityRight,
        expectedFormula,
        expectedExplanations,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Non-cadres'`,
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

  describe("Pour un cadres", () => {
    test.each`
      age   | seniorityRight | seniority | expectedFormula                                                                                              | expectedExplanations
      ${50} | ${1}           | ${0}      | ${""}                                                                                                        | ${[]}
      ${50} | ${1}           | ${1}      | ${""}                                                                                                        | ${[]}
      ${50} | ${1.01}        | ${2}      | ${"(1 / 5 * Sref * A)"}                                                                                      | ${["A: Années de présence dès la première année (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${50} | ${1.01}        | ${5}      | ${"(1 / 4 * Sref * A1)"}                                                                                     | ${["A1: Années de présence dès la première année (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${50} | ${1.01}        | ${17}     | ${"(1 / 4 * Sref * A1) + (1 / 3 * Sref * A2 )"}                                                              | ${["A1: Années de présence dès la première année (15 ans)", "A2: Années de présence après 16 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${51} | ${1}           | ${1}      | ${""}                                                                                                        | ${[]}
      ${51} | ${1.01}        | ${2}      | ${"(1 / 5 * Sref * A)"}                                                                                      | ${["A: Années de présence dès la première année (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${51} | ${1.01}        | ${5}      | ${"(1 / 4 * Sref * A1)"}                                                                                     | ${["A1: Années de présence dès la première année (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${51} | ${1.01}        | ${17}     | ${"(1 / 4 * Sref * A1) + (1 / 3 * Sref * A2 ) + (25% * (1 / 4 * Sref * A1)) + (25% * (1 / 3 * Sref * A2 ))"} | ${["A1: Années de présence dès la première année (15 ans)", "A2: Années de présence après 16 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "ancienneté: $seniority an, age $age => $expectedFormula",
      ({
        seniority,
        seniorityRight,
        expectedFormula,
        expectedExplanations,
        age,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . age":
              age,
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Cadres'`,
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
