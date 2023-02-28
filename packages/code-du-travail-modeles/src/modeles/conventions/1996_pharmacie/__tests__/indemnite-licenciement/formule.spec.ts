import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1996"
);

describe("Formule indemnité licenciement -  CC 1996", () => {
  describe("Non cadres", () => {
    test.each`
      seniority | salary  | expectedFormula                                | expectedExplanations
      ${0.5}    | ${2450} | ${""}                                          | ${[]}
      ${0.67}   | ${2450} | ${"1/4 * Sref * A"}                            | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (2450 €)"]}
      ${9}      | ${2450} | ${"1/4 * Sref * A"}                            | ${["A : Ancienneté totale (9 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${17}     | ${2450} | ${"(1/4 * Sref * A1) + (3.34/10 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (7 ans)", "Sref : Salaire de référence (2450 €)"]}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation",
      ({ seniority, salary, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1996'",
          "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Non-cadres'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Cadres", () => {
    test.each`
      licenciementEco | seniority | salary  | expectedFormula                                                      | expectedExplanations
      ${"'Non'"}      | ${0.67}   | ${2450} | ${"1/4 * Sref * A"}                                                  | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Non'"}      | ${3}      | ${2450} | ${"1/4 * Sref * A"}                                                  | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Non'"}      | ${5}      | ${2450} | ${"3/10 * Sref * A"}                                                 | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Non'"}      | ${12}     | ${2450} | ${"3/10 * Sref * A"}                                                 | ${["A : Ancienneté totale (12 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Non'"}      | ${30}     | ${2450} | ${"(3/10 * Sref * A1) + (5/10 * Sref * A2)"}                         | ${["A1 : Ancienneté de 10 ans ou moins (15 ans)", "A2 : Ancienneté au-delà de 15 ans (15 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Oui'"}      | ${3}      | ${2450} | ${"1/4 * Sref * A"}                                                  | ${["A : Ancienneté totale (3 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Oui'"}      | ${5}      | ${2450} | ${"3/10 * Sref * A"}                                                 | ${["A : Ancienneté totale (5 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Oui'"}      | ${12}     | ${2450} | ${"(3/10 * Sref * A1) + (3.34/10 * Sref * A2)"}                      | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans jusqu'à 15 ans (2 ans)", "Sref : Salaire de référence (2450 €)"]}
      ${"'Oui'"}      | ${30}     | ${2450} | ${"(3/10 * Sref * A1) + (3.34/10 * Sref * A2) + (5/10 * Sref * A3)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans jusqu'à 15 ans (5 ans)", "A3 : Ancienneté au-delà de 15 ans (15 ans)", "Sref : Salaire de référence (2450 €)"]}
    `(
      "ancienneté: $seniority an, pour un licenciement économique $licenciementEco, salaire de référence: $salary => $expectedCompensation",
      ({
        seniority,
        salary,
        expectedFormula,
        expectedExplanations,
        licenciementEco,
      }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1996'",
          "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question":
            licenciementEco,
          "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Cadres'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
