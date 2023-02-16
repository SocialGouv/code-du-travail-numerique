import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2264"
);

describe("Formule indemnité licenciement - 2264", () => {
  describe("Cas normal", () => {
    test.each`
      category        | seniority  | expectedFormula                                | expectedExplanations
      ${"Non-cadres"} | ${11 / 12} | ${""}                                          | ${[]}
      ${"Non-cadres"} | ${1.5}     | ${"(1 / 5 * Sref * A)"}                        | ${["A : Ancienneté totale (1.5 an)", "Sref : Salaire de référence (1000 €)"]}
      ${"Non-cadres"} | ${12}      | ${"(1 / 5 * Sref * A1) + (2 / 5 * Sref * A2)"} | ${["A1 : Années d'ancienneté de 10 ans ou moins (10 ans)", "A2 : Années d'ancienneté au delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${11 / 12} | ${""}                                          | ${[]}
      ${"Cadres"}     | ${1.5}     | ${"(1 / 5 * Sref * A)"}                        | ${["A : Années d'ancienneté totale (1.5 an)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${5}       | ${"(1 / 2 * Sref * A1) + (Sref * A2)"}         | ${["A1 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${12}      | ${"(1 / 2 * Sref * A1) + (Sref * A2)"}         | ${["A1 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A2 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans et comme catégorie $category, et ancienneté non cadre : $seniorityNonCadre",
      ({ category, seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2264'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
            "'Non'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });
        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Cas mixte", () => {
    test.each`
      category        | seniorityNonCadre | seniority | expectedFormula                                              | expectedExplanations
      ${"Non-cadres"} | ${10}             | ${12}     | ${"(1 / 5 * Sref * A1) + (2 / 5 * Sref * A2)"}               | ${["A1 : Années d'ancienneté de 10 ans ou moins (10 ans)", "A2 : Années d'ancienneté au delà de 10 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${0}              | ${12}     | ${"(1 / 2 * Sref * A3) + (Sref * A4)"}                       | ${["A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (7 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${1}              | ${12}     | ${"(1 / 5 * Sref * A1) + (1 / 2 * Sref * A3) + (Sref * A4)"} | ${["A1 : Ancienneté de 10 ans ou moins dans la fonction de non-cadre (1 an)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (6 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${5}              | ${12}     | ${"(1 / 5 * Sref * A1) + (1 / 2 * Sref * A3) + (Sref * A4)"} | ${["A1 : Ancienneté de 10 ans ou moins dans la fonction de non-cadre (5 ans)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${10}             | ${12}     | ${"(1 / 5 * Sref * A1) + (1 / 5 * Sref * A3)"}               | ${["A1 : Ancienneté de 10 ans ou moins dans la fonction de non-cadre (10 ans)", "A3 : Années d'ancienneté dans la fonction de cadre (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${10}             | ${16}     | ${"(1 / 5 * Sref * A1) + (1 / 2 * Sref * A3) + (Sref * A4)"} | ${["A1 : Ancienneté de 10 ans ou moins dans la fonction de non-cadre (10 ans)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (1 an)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}     | ${1}              | ${16}     | ${"(1 / 5 * Sref * A1) + (1 / 2 * Sref * A3) + (Sref * A4)"} | ${["A1 : Ancienneté de 10 ans ou moins dans la fonction de non-cadre (1 an)", "A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)", "A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (10 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans et comme catégorie $category, et ancienneté non cadre : $seniorityNonCadre",
      ({
        category,
        seniority,
        seniorityNonCadre,
        expectedFormula,
        expectedExplanations,
      }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2264'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
            "'Oui'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif":
            seniorityNonCadre,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        });
        const formule = engine.getFormule();
        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
