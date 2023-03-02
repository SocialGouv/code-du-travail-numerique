import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro675 } from "../../types";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "675"
);

describe("Formule pour l'indemnité conventionnel de licenciement pour la CC 675", () => {
  describe("Employés", () => {
    test.each`
      category                  | isCollectifFiring | seniority | expectedFormula                              | expectedExplanations
      ${CategoryPro675.employe} | ${false}          | ${1}      | ${""}                                        | ${[]}
      ${CategoryPro675.employe} | ${false}          | ${5}      | ${"1 / 10 * Sref * A1"}                      | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.employe} | ${false}          | ${15}     | ${"1 / 10 * Sref * A1 + 2 / 10 * Sref * A2"} | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.employe} | ${false}          | ${20}     | ${"1 / 5 * Sref * A"}                        | ${["A : Années d'ancienneté à partir de la première (20 ans)", "Sref : Salaire de référence (2000 €)"]}
    `(
      "Avec $seniority ans, catégorie $category, isCollectifFiring $isCollectifFiring => $expectedFormula",
      ({ category, seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . salaire mensuel des 3 derniers mois":
              "2000",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2000",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Agents", () => {
    test.each`
      category                 | isCollectifFiring | age   | seniority | expectedFormula                                                                                      | expectedExplanations
      ${CategoryPro675.agents} | ${false}          | ${22} | ${1}      | ${""}                                                                                                | ${[]}
      ${CategoryPro675.agents} | ${false}          | ${22} | ${6}      | ${"1 / 10 * Sref * A1"}                                                                              | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (6 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${false}          | ${22} | ${20}     | ${"1 / 10 * Sref * A1 + 2 / 5 * Sref * A2"}                                                          | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (10 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${false}          | ${22} | ${22}     | ${"1 / 10 * Sref * A1 + 2 / 5 * Sref * A2"}                                                          | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (12 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${1}      | ${""}                                                                                                | ${[]}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${6}      | ${"1 / 10 * Sref * A1"}                                                                              | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (6 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${20}     | ${"1 / 10 * Sref * A1 + 2 / 5 * Sref * A2 + 50% * (1 / 10 * Sref * A1) + 50% * (2 / 5 * Sref * A2)"} | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (10 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${22}     | ${"1 / 10 * Sref * A1 + 2 / 5 * Sref * A2 + 50% * (1 / 10 * Sref * A1) + 50% * (2 / 5 * Sref * A2)"} | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (12 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${1}      | ${""}                                                                                                | ${[]}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${6}      | ${"1 / 10 * Sref * A1"}                                                                              | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (6 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${20}     | ${"1 / 10 * Sref * A1 + 2 / 5 * Sref * A2"}                                                          | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (10 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${22}     | ${"1 / 10 * Sref * A1 + 2 / 5 * Sref * A2"}                                                          | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (12 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${25}     | ${"1 / 10 * Sref * A1 + 2 / 5 * Sref * A2"}                                                          | ${["A1 : Années d'ancienneté jusqu'à la 10ème année incluse (10 ans)", "A2 : Années d'ancienneté au-delà de la 10ème année (15 ans)", "Sref : Salaire de référence (2000 €)"]}
    `(
      "Avec $seniority ans, catégorie $category, age $age,isCollectifFiring $isCollectifFiring => $expectedFormula",
      ({
        category,
        isCollectifFiring,
        seniority,
        age,
        expectedFormula,
        expectedExplanations,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . agents . licenciement collectif":
              isCollectifFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . agents . licenciement collectif . autres . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2000",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Cadres", () => {
    test.each`
      category                 | isCollectifFiring | age   | seniority | expectedFormula                                                                                    | expectedExplanations
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${1.5}    | ${""}                                                                                              | ${[]}
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${4}      | ${"1 / 10 * Sref * A"}                                                                             | ${["A : Années de présence (4 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${5}      | ${"1 / 10 * Sref * A"}                                                                             | ${["A : Années de présence (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${20}     | ${"1 / 5 * Sref * A1 + 2 / 5 * Sref * A2"}                                                         | ${["A1 : Années d'ancienneté depuis l'entrée dans l'entreprise jusqu'à 15 années révolues (15 ans)", "A2 : Années d'ancienneté au delà de 15 ans (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${false}          | ${5}  | ${1.5}    | ${""}                                                                                              | ${[]}
      ${CategoryPro675.cadres} | ${false}          | ${50} | ${4}      | ${"1 / 10 * Sref * A"}                                                                             | ${["A : Années de présence (4 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${false}          | ${50} | ${5}      | ${"1 / 10 * Sref * A"}                                                                             | ${["A : Années de présence (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${false}          | ${50} | ${20}     | ${"1 / 5 * Sref * A1 + 2 / 5 * Sref * A2 + 50% * (1 / 5 * Sref * A1) + 50% * (2 / 5 * Sref * A2)"} | ${["A1 : Années d'ancienneté depuis l'entrée dans l'entreprise jusqu'à 15 années révolues (15 ans)", "A2 : Années d'ancienneté au delà de 15 ans (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${1.5}    | ${""}                                                                                              | ${[]}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${4}      | ${"1 / 10 * Sref * A"}                                                                             | ${["A : Années de présence (4 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${5}      | ${"1 / 10 * Sref * A"}                                                                             | ${["A : Années de présence (5 ans)", "Sref : Salaire de référence (2000 €)"]}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${20}     | ${"1 / 5 * Sref * A1 + 2 / 5 * Sref * A2"}                                                         | ${["A1 : Années d'ancienneté depuis l'entrée dans l'entreprise jusqu'à 15 années révolues (15 ans)", "A2 : Années d'ancienneté au delà de 15 ans (5 ans)", "Sref : Salaire de référence (2000 €)"]}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isCollectifFiring $isCollectifFiring => $expectedFormula",
      ({
        category,
        isCollectifFiring,
        seniority,
        age,
        expectedFormula,
        expectedExplanations,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . cadres . licenciement collectif":
              isCollectifFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . cadres . licenciement collectif . autres . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2000",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
