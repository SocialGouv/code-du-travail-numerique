import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getReferences } from "../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";

const engine = new Engine(mergeModels());

const CommonReferences = [
  {
    article: "Article 32",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005787790/?idConteneur=KALICONT000005635780",
  },
];

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  ...CommonReferences,
];

const MiseRetraiteCcReferences = [
  ...MiseRetraiteReferences,
  ...CommonReferences,
];

describe("Convention collective 2120", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${0}
      ${6}      | ${1}
      ${24}     | ${2}
      ${25}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2120'",
          "contrat salarié . ancienneté": seniority,
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
      ${5}      | ${3}
      ${6}      | ${3}
      ${24}     | ${3}
      ${25}     | ${3}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2120'",
          "contrat salarié . ancienneté": seniority,
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
