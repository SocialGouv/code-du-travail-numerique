import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const MiseRetraiteNonCadresReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 20",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005829411",
  },
];

const DepartRetraiteCadresReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Dispositions particulières cadres, article 6",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005829442?idConteneur=KALICONT000005635528",
  },
];

const MiseRetraiteCadresReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Dispositions particulières cadres, article 6",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005829442?idConteneur=KALICONT000005635528",
  },
];

describe("Préavis de retraite de la CC 1996", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category        | seniority | expectedResult | expectedReferences
      ${"Non-cadres"} | ${5}      | ${0}           | ${DepartRetraiteReferences}
      ${"Non-cadres"} | ${6}      | ${1}           | ${DepartRetraiteReferences}
      ${"Non-cadres"} | ${24}     | ${2}           | ${DepartRetraiteReferences}
      ${"Cadres"}     | ${5}      | ${3}           | ${DepartRetraiteCadresReferences}
      ${"Cadres"}     | ${6}      | ${1}           | ${DepartRetraiteCadresReferences}
      ${"Cadres"}     | ${24}     | ${2}           | ${DepartRetraiteCadresReferences}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult, expectedReferences }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1996'",
          "contrat salarié . convention collective . pharmacie . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category        | seniority | expectedResult | expectedReferences
      ${"Non-cadres"} | ${5}      | ${1}           | ${MiseRetraiteNonCadresReferences}
      ${"Non-cadres"} | ${6}      | ${1}           | ${MiseRetraiteNonCadresReferences}
      ${"Non-cadres"} | ${24}     | ${2}           | ${MiseRetraiteNonCadresReferences}
      ${"Cadres"}     | ${5}      | ${3}           | ${MiseRetraiteCadresReferences}
      ${"Cadres"}     | ${6}      | ${3}           | ${MiseRetraiteCadresReferences}
      ${"Cadres"}     | ${24}     | ${3}           | ${MiseRetraiteCadresReferences}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult, expectedReferences }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1996'",
          "contrat salarié . convention collective . pharmacie . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
