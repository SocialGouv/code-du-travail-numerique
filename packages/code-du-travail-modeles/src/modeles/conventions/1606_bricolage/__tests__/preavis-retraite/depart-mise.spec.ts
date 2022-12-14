import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const DepartReferences = [
  {
    article: "Article 9.3.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005870737/?idConteneur=KALICONT000005635871",
  },
];

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  ...DepartReferences,
];

const MiseRetraiteEmployesReferences = [
  {
    article: "Article 9.2.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005870734?idConteneur=KALICONT000005635871",
  },
];

const MiseRetraiteEmployesCcReferences = [
  ...MiseRetraiteReferences,
  ...MiseRetraiteEmployesReferences,
];

const MiseRetraiteAgentsReferences = [
  {
    article: `Annexe "agents de maîtrise", article 9`,
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005870772/?idConteneur=KALICONT000005635871",
  },
];

const MiseRetraiteAgentsCcReferences = [
  ...MiseRetraiteReferences,
  ...MiseRetraiteAgentsReferences,
];

const MiseRetraiteCadresReferences = [
  {
    article: `Annexe "cadres", article 9`,
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005870787/?idConteneur=KALICONT000005635871",
  },
];

const MiseRetraiteCadresCcReferences = [
  ...MiseRetraiteReferences,
  ...MiseRetraiteCadresReferences,
];

describe("Convention collective 1606", () => {
  describe("Pour un départ à la retraite", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${1}
      ${6}      | ${1}
      ${24}     | ${1}
      ${25}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1606'",
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
      seniority | category                | expectedResult | expectedUnit | expectedReferences
      ${0}      | ${"Employés"}           | ${0}           | ${"mois"}    | ${MiseRetraiteEmployesCcReferences}
      ${5}      | ${"Employés"}           | ${15}          | ${"jour"}    | ${MiseRetraiteEmployesCcReferences}
      ${6}      | ${"Employés"}           | ${1}           | ${"mois"}    | ${MiseRetraiteEmployesCcReferences}
      ${24}     | ${"Employés"}           | ${2}           | ${"mois"}    | ${MiseRetraiteEmployesCcReferences}
      ${25}     | ${"Employés"}           | ${2}           | ${"mois"}    | ${MiseRetraiteEmployesCcReferences}
      ${1}      | ${"Agents de maîtrise"} | ${0}           | ${"mois"}    | ${MiseRetraiteAgentsCcReferences}
      ${5}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${MiseRetraiteAgentsCcReferences}
      ${6}      | ${"Agents de maîtrise"} | ${1}           | ${"mois"}    | ${MiseRetraiteAgentsCcReferences}
      ${7}      | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${MiseRetraiteAgentsCcReferences}
      ${24}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${MiseRetraiteAgentsCcReferences}
      ${25}     | ${"Agents de maîtrise"} | ${2}           | ${"mois"}    | ${MiseRetraiteAgentsCcReferences}
      ${2}      | ${"Cadres"}             | ${0}           | ${"mois"}    | ${MiseRetraiteCadresCcReferences}
      ${5}      | ${"Cadres"}             | ${1}           | ${"mois"}    | ${MiseRetraiteCadresCcReferences}
      ${6}      | ${"Cadres"}             | ${1}           | ${"mois"}    | ${MiseRetraiteCadresCcReferences}
      ${7}      | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteCadresCcReferences}
      ${24}     | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteCadresCcReferences}
      ${25}     | ${"Cadres"}             | ${3}           | ${"mois"}    | ${MiseRetraiteCadresCcReferences}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({
        seniority,
        category,
        expectedResult,
        expectedUnit,
        expectedReferences,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1606'",
          "contrat salarié . convention collective . bricolage . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual([expectedUnit]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
