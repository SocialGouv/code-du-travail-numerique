import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonDepartRetraiteReference = {
  article: "Article 93 a",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005792106/?idConteneur=KALICONT000005635918",
};

const MiseRetraiteNonCadresReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 93 b",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005792106/?idConteneur=KALICONT000005635918",
  },
  {
    article: "Article 91 a",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005792102/?idConteneur=KALICONT000005635918",
  },
];

const MiseRetraiteCadresReferences = [
  ...MiseRetraiteReferences,
  {
    article:
      'Article II. 6, accord relatif aux dispositions particulières "Cadres"',
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000026688804/?idConteneur=KALICONT000005635918",
  },
];

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  CommonDepartRetraiteReference,
];

describe("Préavis de retraite de la CC 1672", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category                        | seniority | expectedResult
      ${"Non-cadres (Classes 1 à 4)"} | ${5}      | ${1}
      ${"Non-cadres (Classes 1 à 4)"} | ${6}      | ${1}
      ${"Non-cadres (Classes 1 à 4)"} | ${24}     | ${1}
      ${"Non-cadres (Classes 1 à 4)"} | ${25}     | ${1}
      ${"Cadres (Classes 5 à 7)"}     | ${5}      | ${1}
      ${"Cadres (Classes 5 à 7)"}     | ${6}      | ${1}
      ${"Cadres (Classes 5 à 7)"}     | ${24}     | ${1}
      ${"Cadres (Classes 5 à 7)"}     | ${25}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1672'",
            "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
        expect(references).toHaveLength(DepartRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteCcReferences)
        );
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category                        | seniority | expectedResult | expectedReferences
      ${"Non-cadres (Classes 1 à 4)"} | ${5}      | ${1}           | ${MiseRetraiteNonCadresReferences}
      ${"Non-cadres (Classes 1 à 4)"} | ${6}      | ${1}           | ${MiseRetraiteNonCadresReferences}
      ${"Non-cadres (Classes 1 à 4)"} | ${24}     | ${2}           | ${MiseRetraiteNonCadresReferences}
      ${"Cadres (Classes 5 à 7)"}     | ${5}      | ${3}           | ${MiseRetraiteCadresReferences}
      ${"Cadres (Classes 5 à 7)"}     | ${6}      | ${3}           | ${MiseRetraiteCadresReferences}
      ${"Cadres (Classes 5 à 7)"}     | ${24}     | ${3}           | ${MiseRetraiteCadresReferences}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult, expectedReferences }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1672'",
            "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
        expect(references).toEqual(expectedReferences);
      }
    );
  });
});
