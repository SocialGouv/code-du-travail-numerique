import Engine from "publicodes";

import modeles from "../../../../../../src/modeles/modeles-indemnite-licenciement.json";
import { getFormule } from "../../../../common";

const engine = new Engine(modeles as any);

describe("Formule indemnité licenciement - 413", () => {
  describe("Cas général", () => {
    test.each`
      category                                                                                                                         | seniority  | expectedFormula       | expectedExplanations
      ${"Non-cadres"}                                                                                                                  | ${23 / 12} | ${""}                 | ${[]}
      ${"Non-cadres"}                                                                                                                  | ${2}       | ${"1 / 2 * Sref * A"} | ${["A : Ancienneté totale (2 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Non-cadres"}                                                                                                                  | ${10}      | ${"1 / 2 * Sref * A"} | ${["A : Ancienneté totale (10 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}                                                                                                                      | ${23 / 12} | ${""}                 | ${[]}
      ${"Cadres"}                                                                                                                      | ${2}       | ${""}                 | ${[]}
      ${"Cadres"}                                                                                                                      | ${25 / 12} | ${"Sref * A"}         | ${["A : Ancienneté totale (2.08 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}                                                                                                                      | ${15}      | ${"Sref * A"}         | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${23 / 12} | ${""}                 | ${[]}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${2}       | ${""}                 | ${[]}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${25 / 12} | ${"Sref * A"}         | ${["A : Ancienneté totale (2.08 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${15}      | ${"Sref * A"}         | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans et comme catégorie $category",
      ({ category, seniority, expectedFormula, expectedExplanations }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0413'",
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période":
            "non",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        });
        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Cas mixte", () => {
    test.each`
      category                                                                                                                         | seniorityNonCadre | seniority | expectedFormula                        | expectedExplanations
      ${"Cadres"}                                                                                                                      | ${23 / 12}        | ${15}     | ${"(1 / 2 * Sref * A1) + (Sref * A2)"} | ${["A1 : Année de service en qualité de non-cadres (1.92 an)", "A2 : Année de service en qualité de cadre (13.08 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres"}                                                                                                                      | ${25 / 12}        | ${15}     | ${"(1 / 2 * Sref * A1) + (Sref * A2)"} | ${["A1 : Année de service en qualité de non-cadres (2.08 ans)", "A2 : Année de service en qualité de cadre (12.92 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${23 / 12}        | ${15}     | ${"(1 / 2 * Sref * A1) + (Sref * A2)"} | ${["A1 : Année de service en qualité de non-cadres (1.92 an)", "A2 : Année de service en qualité de cadre (13.08 ans)", "Sref : Salaire de référence (1000 €)"]}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${25 / 12}        | ${15}     | ${"(1 / 2 * Sref * A1) + (Sref * A2)"} | ${["A1 : Année de service en qualité de non-cadres (2.08 ans)", "A2 : Année de service en qualité de cadre (12.92 ans)", "Sref : Salaire de référence (1000 €)"]}
    `(
      "Formule $expectedFormula avec $seniority ans et comme catégorie $category, et ancienneté non cadre : $seniorityNonCadre",
      ({
        category,
        seniority,
        seniorityNonCadre,
        expectedFormula,
        expectedExplanations,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0413'",
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période":
            "'Oui'",
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps effectif": seniorityNonCadre,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        });
        const formule = getFormule(situation);

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
