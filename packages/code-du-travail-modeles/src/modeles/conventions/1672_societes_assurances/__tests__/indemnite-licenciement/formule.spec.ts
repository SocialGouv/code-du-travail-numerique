import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1672"
);

describe("Formule indemnité licenciement - CC 1672", () => {
  describe("Calcul de l'indemnité de licenciement pour un non cadre", () => {
    test.each`
      seniority | age   | expectedFormula                              | expectedExplanations
      ${3}      | ${49} | ${""}                                        | ${[]}
      ${8}      | ${49} | ${"2.5% * Sref * A1"}                        | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (8 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${10}     | ${49} | ${"3% * Sref * A1"}                          | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (10 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${20}     | ${49} | ${"3.5% * Sref * A1"}                        | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (20 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${30}     | ${49} | ${"4% * Sref * A1"}                          | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (30 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${3}      | ${52} | ${""}                                        | ${[]}
      ${8}      | ${52} | ${"(2.5% * Sref * A1) + (0.5% * Sref * A1)"} | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (8 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${10}     | ${52} | ${"(3% * Sref * A1) + (0.5% * Sref * A1)"}   | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (10 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${20}     | ${52} | ${"(3.5% * Sref * A1) + (0.5% * Sref * A1)"} | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (20 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${30}     | ${52} | ${"(4% * Sref * A1) + (0.5% * Sref * A1)"}   | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (30 ans)", "Sref : Salaire de référence (32376 €)"]}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ seniority, age, expectedFormula, expectedExplanations }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1672'",
            "contrat salarié . convention collective . sociétés d'assurances . age":
              age,
            "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
              "'Non-cadres (Classes 1 à 4)'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "32376",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement pour un cadre", () => {
    test.each`
      seniority | seniorityNonCadre | age   | expectedFormula                                                                           | expectedExplanations
      ${3}      | ${0}              | ${49} | ${""}                                                                                     | ${[]}
      ${8}      | ${0}              | ${49} | ${"4% * Sref * A2"}                                                                       | ${["A2 : Années de présence dans l'entreprise en tant que cadre (8 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${10}     | ${0}              | ${49} | ${"4.5% * Sref * A2"}                                                                     | ${["A2 : Années de présence dans l'entreprise en tant que cadre (10 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${20}     | ${0}              | ${49} | ${"5% * Sref * A2"}                                                                       | ${["A2 : Années de présence dans l'entreprise en tant que cadre (20 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${30}     | ${0}              | ${49} | ${"5.5% * Sref * A2"}                                                                     | ${["A2 : Années de présence dans l'entreprise en tant que cadre (30 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${3}      | ${0}              | ${52} | ${""}                                                                                     | ${[]}
      ${8}      | ${0}              | ${52} | ${"(4% * Sref * A2) + (0.75% * Sref * A2)"}                                               | ${["A2 : Années de présence dans l'entreprise en tant que cadre (8 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${10}     | ${0}              | ${52} | ${"(4.5% * Sref * A2) + (0.75% * Sref * A2)"}                                             | ${["A2 : Années de présence dans l'entreprise en tant que cadre (10 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${20}     | ${0}              | ${52} | ${"(5% * Sref * A2) + (0.75% * Sref * A2)"}                                               | ${["A2 : Années de présence dans l'entreprise en tant que cadre (20 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${30}     | ${0}              | ${52} | ${"(5.5% * Sref * A2) + (0.75% * Sref * A2)"}                                             | ${["A2 : Années de présence dans l'entreprise en tant que cadre (30 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${7}      | ${1}              | ${49} | ${"(2.5% * Sref * A1) + (4% * Sref * A2)"}                                                | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (1 an)", "A2 : Années de présence dans l'entreprise en tant que cadre (7 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${7}      | ${3}              | ${49} | ${"(2.5% * Sref * A1) + (4% * Sref * A2)"}                                                | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (3 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (7 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${10}     | ${10}             | ${49} | ${"(3% * Sref * A1) + (4.5% * Sref * A2)"}                                                | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (10 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (10 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${9}      | ${20}             | ${49} | ${"(3.5% * Sref * A1) + (4% * Sref * A2)"}                                                | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (20 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (9 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${25}     | ${5}              | ${49} | ${"(2.5% * Sref * A1) + (5% * Sref * A2)"}                                                | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (5 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (25 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${7}      | ${1}              | ${52} | ${"(((2.5% * Sref * A1) + (0.5% * Sref * A1)) + (4% * Sref * A2)) + (0.75% * Sref * A2)"} | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (1 an)", "A2 : Années de présence dans l'entreprise en tant que cadre (7 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${7}      | ${3}              | ${52} | ${"(((2.5% * Sref * A1) + (0.5% * Sref * A1)) + (4% * Sref * A2)) + (0.75% * Sref * A2)"} | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (3 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (7 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${10}     | ${10}             | ${52} | ${"(((3% * Sref * A1) + (0.5% * Sref * A1)) + (4.5% * Sref * A2)) + (0.75% * Sref * A2)"} | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (10 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (10 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${9}      | ${20}             | ${52} | ${"(((3.5% * Sref * A1) + (0.5% * Sref * A1)) + (4% * Sref * A2)) + (0.75% * Sref * A2)"} | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (20 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (9 ans)", "Sref : Salaire de référence (32376 €)"]}
      ${25}     | ${5}              | ${52} | ${"(((2.5% * Sref * A1) + (0.5% * Sref * A1)) + (5% * Sref * A2)) + (0.75% * Sref * A2)"} | ${["A1 : Années de présence dans l'entreprise en tant que non cadre (5 ans)", "A2 : Années de présence dans l'entreprise en tant que cadre (25 ans)", "Sref : Salaire de référence (32376 €)"]}
    `(
      "Avec une ancienneté $seniority ans (cadre), $seniorityNonCadre ans (non-cadre) et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        seniority,
        age,
        expectedFormula,
        expectedExplanations,
        seniorityNonCadre,
      }) => {
        const dateCadre =
          seniorityNonCadre > 0
            ? {
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . date du statut cadre":
                  "01/01/2010",
              }
            : {};
        const situation = {
          "contrat salarié . convention collective": "'IDCC1672'",
          "contrat salarié . convention collective . sociétés d'assurances . age":
            age,
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
            "'Cadres (Classes 5 à 7)'",
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté non cadre":
            seniorityNonCadre,
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres": `${
            seniorityNonCadre > 0 ? "'Oui'" : "'Non'"
          }`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": `${
             
            seniority + seniorityNonCadre
          }`,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "32376",
          ...dateCadre,
        };
        engine.setSituation(
          situation,
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const formule = engine.getFormule();

        // expect(situation).toEqual({});
        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
