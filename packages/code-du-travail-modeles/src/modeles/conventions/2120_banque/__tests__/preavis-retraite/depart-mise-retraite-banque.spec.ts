import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReferences = [
  {
    article: "Article 32",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005787789#KALIARTI000005787789",
  },
];

const MiseRetraiteCcReferences = [
  ...MiseRetraiteReferences,
  ...CommonReferences,
];

describe("Préavis de retraite de la CC 2120", () => {
  describe("Départ à la retraite", () => {
    test.each`
      seniority | expectedResult | expectedUnit
      ${5}      | ${0}           | ${"semaines"}
      ${6}      | ${1}           | ${"mois"}
      ${24}     | ${2}           | ${"mois"}
      ${25}     | ${2}           | ${"mois"}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult, expectedUnit }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2120'",
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual(expectedUnit);
        expect(missingArgs).toEqual([]);
        expect(references).toHaveLength(DepartRetraiteReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteReferences)
        );
      }
    );
  });

  describe("Mise à la retraite", () => {
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
            "contrat salarié . convention collective": "'IDCC2120'",
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
      }
    );
  });
});
