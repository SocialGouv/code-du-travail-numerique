import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getNotifications, getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const DepartReferences = [
  {
    article: "Article 7.12",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000017941945/?idConteneur=KALICONT000017941839",
  },
];

const MiseReferences = [
  {
    article: "Article 7.9",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000017941940/?idConteneur=KALICONT000017941839",
  },
];

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  ...DepartReferences,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, ...MiseReferences];

describe("Convention collective 2420", () => {
  describe("Pour un départ à la retraite", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${3}
      ${6}      | ${1}
      ${24}     | ${2}
      ${25}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC2420'",
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);
        const notifications = getNotifications(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(DepartRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteCcReferences)
        );
        expect(notifications).toHaveLength(1);
        expect(notifications[0].description).toBe(
          `Attention : L'article de la convention collective ou la convention collective saisie n’a pas été étendu au niveau national. Par conséquent, pour que ce résultat soit applicable à votre situation, il faut que l’employeur ait adhéré à l’organisation patronale signataire de cette convention. Sans cette adhésion, l'employeur n'a pas l'obligation d'appliquer les règles de la convention mais il applique le préavis prévu par le code du travail.`
        );
      }
    );
  });

  describe("Pour une mise à la retraite", () => {
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
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC2420'",
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "non",
        });
        const result = situation.evaluate(
          "contrat salarié . préavis de retraite"
        );
        const references = getReferences(situation);
        const notifications = getNotifications(situation);

        expect(result.nodeValue).toEqual(expectedResult);
        expect(result.unit?.numerators).toEqual(["mois"]);
        expect(result.missingVariables).toEqual({});
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
        expect(notifications).toHaveLength(1);
        expect(notifications[0].description).toBe(
          `Attention : L'article de la convention collective ou la convention collective saisie n’a pas été étendu au niveau national. Par conséquent, pour que ce résultat soit applicable à votre situation, il faut que l’employeur ait adhéré à l’organisation patronale signataire de cette convention. Sans cette adhésion, l'employeur n'a pas l'obligation d'appliquer les règles de la convention mais il applique le préavis prévu par le code du travail.`
        );
      }
    );
  });
});
