import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getReferences } from "../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";

const engine = new Engine(mergeModels());

const CommonReference = {
  article: "Article 50.3",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005802016/?idConteneur=KALICONT000005635813",
};

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  CommonReference,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Convention collective 2264", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${1}
      ${24}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2264'",
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
      category        | seniority | expectedResult
      ${"Cadres"}     | ${5}      | ${3}
      ${"Cadres"}     | ${6}      | ${3}
      ${"Cadres"}     | ${24}     | ${3}
      ${"Cadres"}     | ${119}    | ${3}
      ${"Cadres"}     | ${120}    | ${6}
      ${"Non-cadres"} | ${5}      | ${3}
      ${"Non-cadres"} | ${6}      | ${3}
      ${"Non-cadres"} | ${24}     | ${3}
      ${"Non-cadres"} | ${120}    | ${3}
    `(
      "Pour un employé de tel catégories : $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2264'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle": `'${category}'`,
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
