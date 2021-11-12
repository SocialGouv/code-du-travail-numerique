import Engine from "publicodes";

import { mergeModels } from "../../internal/merger";
import { getReferences } from "../../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../common/legal-references";

const engine = new Engine(mergeModels());

const CommonReference = {
  article: "Article 1.1.12.a",
  url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801005?idConteneur=KALICONT000005635685",
};

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  CommonReference,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Préavis de retraite de la CC 1740", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${1}
      ${24}     | ${2}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1740'",
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
        expect(references).toHaveLength(DepartRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteCcReferences)
        );
      }
    );
  });

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${2}
      ${24}     | ${2}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1740'",
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
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
      }
    );
  });
});
