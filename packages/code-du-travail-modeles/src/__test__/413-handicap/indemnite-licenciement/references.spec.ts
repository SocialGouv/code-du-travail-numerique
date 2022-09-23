import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";

const engine = new Engine(mergeModels());

const referencesNonCadres = [
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005863126?idConteneur=KALICONT000005635407",
  },
];

const referencesCadres = [
  {
    article: "Article 10 de l'Annexe n°6 Dispositions spéciales aux cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022837395?idConteneur=KALICONT000005635407",
  },
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005863126?idConteneur=KALICONT000005635407",
  },
];

const referencesCadresDirecteur = [
  {
    article: "Article 10 de l'Annexe n°6 Dispositions spéciales aux cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022837395?idConteneur=KALICONT000005635407",
  },
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005863126?idConteneur=KALICONT000005635407",
  },
];

const refNonCadrePuisCadres = [
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005863126?idConteneur=KALICONT000005635407",
  },
  {
    article: "Article 10 de l'Annexe n°6 Dispositions spéciales aux cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022837395?idConteneur=KALICONT000005635407",
  },
];

const refNonCadresPuisCadresDirecteur = [
  {
    article: "Article 47",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000020981961?idConteneur=KALICONT000005635813",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 413", () => {
  describe("Cas standard", () => {
    test.each`
      category                                                                                                                         | seniority | salary  | expectedReferences
      ${"Non-cadres"}                                                                                                                  | ${10}     | ${2000} | ${referencesNonCadres}
      ${"Cadres"}                                                                                                                      | ${0}      | ${2000} | ${referencesCadres}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${10}     | ${2000} | ${referencesCadresDirecteur}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedReferences",
      ({ seniority, salary, expectedReferences, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0413'",
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période":
            "'Non'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "indemnité de licenciement": "oui",
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Cas mixte", () => {
    test.each`
      category                                                                                                                         | seniority | salary  | expectedReferences
      ${"Cadres"}                                                                                                                      | ${20}     | ${2000} | ${refNonCadrePuisCadres}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${20}     | ${2000} | ${refNonCadresPuisCadresDirecteur}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedReferences",
      ({ seniority, salary, expectedReferences, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0413'",
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période":
            "'Oui'",
          "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps": 10,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "indemnité de licenciement": "oui",
        });
        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
