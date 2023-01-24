import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2098"
);

describe("Formule de l'indemnité de licenciement - CC 2098", () => {
  describe("Licenciement pour inaptitude non professionnelle", () => {
    test.each`
      seniority | expectedFormula                            | expectedExplanations
      ${7 / 12} | ${""}                                      | ${[]}
      ${0.67}   | ${"1/4 * Sref * A"}                        | ${["A : Ancienneté totale (0.67 an)", "Sref : Salaire de référence (2800 €)"]}
      ${18}     | ${"(1/4 * Sref * A1) + (1/3 * Sref * A2)"} | ${["A1 : Ancienneté de 10 ans ou moins (10 ans)", "A2 : Ancienneté au-delà de 10 ans (8 ans)", "Sref : Salaire de référence (2800 €)"]}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2098'",
          "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2800",
        });

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Autre licenciement", () => {
    test.each`
      seniority  | expectedFormula                                                                                         | expectedExplanations
      ${23 / 12} | ${""}                                                                                                   | ${[]}
      ${2}       | ${"1/10 * Sref * A"}                                                                                    | ${["A: Années d'ancienneté à compter de la 1re année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${7}       | ${"(1/10 * Sref * A1) + (1/7 * Sref * A2)"}                                                             | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${14}      | ${"(1/10 * Sref * A1) + (1/7 * Sref * A2) + (1/5 * Sref * A3)"}                                         | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (4 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${26}      | ${"(1/10 * Sref * A1) + (1/7 * Sref * A2) + (1/5 * Sref * A3) + (1/4 * Sref * A4)"}                     | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (10 ans)", "A4: Années d'ancienneté au-delà de la 20e année (6 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${33}      | ${"(1/10 * Sref * A1) + (1/7 * Sref * A2) + (1/5 * Sref * A3) + (1/4 * Sref * A4) + (1/3 * Sref * A5)"} | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (10 ans)", "A4: Années d'ancienneté au-delà de la 20e année (10 ans)", "A5: Années d'ancienneté au-delà de la 30e année (3 ans)", "Sref : Salaire de référence (2800 €)"]}
    `(
      "Non-cadres, Avec une ancienneté $seniority ans => $expectedFormula",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2098'",
          "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
            "'Non-cadres'",
          "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
            "'Non'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2800",
        });

        const formule = engine.getFormule();
        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );

    test.each`
      seniority  | age   | expectedFormula                                                                                                                                                                        | expectedExplanations
      ${23 / 12} | ${35} | ${""}                                                                                                                                                                                  | ${[]}
      ${2}       | ${35} | ${"3/10 * Sref * A"}                                                                                                                                                                   | ${["A: Années d'ancienneté à compter de la 1re année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${7}       | ${35} | ${"(3/10 * Sref * A1) + (4/10 * Sref * A2)"}                                                                                                                                           | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${14}      | ${35} | ${"(3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)"}                                                                                                                      | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (4 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${22}      | ${35} | ${"(3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (6/10 * Sref * A4)"}                                                                                                 | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (5 ans)", "A4: Années d'ancienneté au-delà de la 15e année (7 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${35}      | ${35} | ${"18 * Sref"}                                                                                                                                                                         | ${["Sref : Salaire de référence (2800 €)"]}
      ${2}       | ${54} | ${"(3/10 * Sref * A) + (10% * (3/10 * Sref * A))"}                                                                                                                                     | ${["A: Années d'ancienneté à compter de la 1re année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${7}       | ${54} | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2)) + (10% * ((3/10 * Sref * A1) + (4/10 * Sref * A2)))"}                                                                                     | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${14}      | ${54} | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)) + (10% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)))"}                                           | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (4 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${22}      | ${54} | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (6/10 * Sref * A4)) + (10% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (6/10 * Sref * A4)))"} | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (5 ans)", "A4: Années d'ancienneté au-delà de la 15e année (7 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${35}      | ${54} | ${"18 * Sref"}                                                                                                                                                                         | ${["Sref : Salaire de référence (2800 €)"]}
      ${2}       | ${56} | ${"(3/10 * Sref * A) + (25% * (3/10 * Sref * A))"}                                                                                                                                     | ${["A: Années d'ancienneté à compter de la 1re année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${7}       | ${56} | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2)) + (25% * ((3/10 * Sref * A1) + (4/10 * Sref * A2)))"}                                                                                     | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (2 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${14}      | ${56} | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)) + (25% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3)))"}                                           | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (4 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${22}      | ${56} | ${"((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (6/10 * Sref * A4)) + (25% * ((3/10 * Sref * A1) + (4/10 * Sref * A2) + (5/10 * Sref * A3) + (6/10 * Sref * A4)))"} | ${["A1: Années d'ancienneté à compter de la 1re année (5 ans)", "A2: Années d'ancienneté au-delà de la 5e année (5 ans)", "A3: Années d'ancienneté au-delà de la 10e année (5 ans)", "A4: Années d'ancienneté au-delà de la 15e année (7 ans)", "Sref : Salaire de référence (2800 €)"]}
      ${35}      | ${56} | ${"18 * Sref"}                                                                                                                                                                         | ${["Sref : Salaire de référence (2800 €)"]}
    `(
      "Cadres, avec une ancienneté $seniority ans, un age $age ans => $expectedFormula",
      ({ seniority, age, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2098'",
          "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . cadres . age": age,
          "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
            "'Non'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2800",
        });

        const formule = engine.getFormule();
        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
