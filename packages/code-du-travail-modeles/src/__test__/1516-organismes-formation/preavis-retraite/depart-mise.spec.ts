import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const CommonReferences = [
  {
    article: "Article 9.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005775560/?idConteneur=KALICONT000005635435",
  },
];

const MiseRetraiteCcReferences = [
  ...MiseRetraiteReferences,
  ...CommonReferences,
];

describe("Convention collective 1702", () => {
  describe("Pour un départ à la retraite", () => {
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
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1516'",
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(references).toHaveLength(DepartRetraiteReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteReferences)
        );
      }
    );
  });

  describe("Pour une mise à la retraite", () => {
    test.each`
      seniority | category         | expectedResult
      ${5}      | ${"Employés"}    | ${1}
      ${6}      | ${"Employés"}    | ${1}
      ${24}     | ${"Employés"}    | ${2}
      ${25}     | ${"Employés"}    | ${2}
      ${5}      | ${"Techniciens"} | ${2}
      ${6}      | ${"Techniciens"} | ${2}
      ${24}     | ${"Techniciens"} | ${2}
      ${25}     | ${"Techniciens"} | ${2}
      ${5}      | ${"Cadres"}      | ${3}
      ${6}      | ${"Cadres"}      | ${3}
      ${24}     | ${"Cadres"}      | ${3}
      ${25}     | ${"Cadres"}      | ${3}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, category, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1516'",
          "contrat salarié . convention collective . organismes de formation . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "non",
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
