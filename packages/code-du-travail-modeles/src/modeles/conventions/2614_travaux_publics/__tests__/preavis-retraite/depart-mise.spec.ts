import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const DepartReferences = [
  {
    article: "Article 8.12",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926442?idConteneur=KALICONT000018926209",
  },
];

const MiseReferences = [
  {
    article: "Article 8.9",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000018926437/?idConteneur=KALICONT000018926209",
  },
];

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  ...DepartReferences,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, ...MiseReferences];

describe("Convention collective 2614", () => {
  describe("Pour un départ à la retraite", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${1}
      ${24}     | ${2}
      ${25}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2614'",
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();
        const notifications = engine.getNotifications();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
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
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2614'",
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();
        const notifications = engine.getNotifications();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
        expect(notifications).toHaveLength(0);
      }
    );
  });
});
