import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReferences = [
  {
    article: "Article 4.4.2.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021063914/?idConteneur=KALICONT000017577652",
  },
  {
    article: "Article 4.4.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021063914/?idConteneur=KALICONT000017577652",
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

describe("Convention collective 2511", () => {
  describe("Pour un départ à la retraite", () => {
    test.each`
      seniority | category         | expectedResult
      ${5}      | ${"Ouvriers"}    | ${1}
      ${6}      | ${"Ouvriers"}    | ${1}
      ${24}     | ${"Ouvriers"}    | ${1}
      ${25}     | ${"Ouvriers"}    | ${1}
      ${5}      | ${"Techniciens"} | ${2}
      ${6}      | ${"Techniciens"} | ${1}
      ${24}     | ${"Techniciens"} | ${2}
      ${25}     | ${"Techniciens"} | ${2}
      ${5}      | ${"Cadres"}      | ${3}
      ${6}      | ${"Cadres"}      | ${1}
      ${24}     | ${"Cadres"}      | ${2}
      ${25}     | ${"Cadres"}      | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, category, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2511'",
            "contrat salarié . convention collective . sport . catégorie professionnelle": `'${category}'`,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual("mois");
        expect(missingArgs).toEqual([]);
        expect(references).toHaveLength(DepartRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(DepartRetraiteCcReferences)
        );
      }
    );
  });

  describe("Pour une mise à la retraite", () => {
    test.each`
      seniority | category         | expectedResult
      ${5}      | ${"Ouvriers"}    | ${1}
      ${6}      | ${"Ouvriers"}    | ${1}
      ${24}     | ${"Ouvriers"}    | ${2}
      ${25}     | ${"Ouvriers"}    | ${2}
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
            "contrat salarié . convention collective": "'IDCC2511'",
            "contrat salarié . convention collective . sport . catégorie professionnelle": `'${category}'`,
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
