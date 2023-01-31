import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReferences = [
  {
    article: "Article 9.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005775560/?idConteneur=KALICONT000005635435",
  },
];

const MiseRetraiteCcReferences = [
  ...MiseRetraiteReferences,
  ...CommonReferences,
];

describe("Convention collective 1702", () => {
  describe("Pour un départ à la retraite", () => {
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
            "contrat salarié . convention collective": "'IDCC1516'",
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual(expectedUnit);
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
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1516'",
            "contrat salarié . convention collective . organismes de formation . catégorie professionnelle": `'${category}'`,
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
