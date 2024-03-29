import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReferences = [
  {
    article: "Article 19.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005850366/?idConteneur=KALICONT000005635550",
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

describe("Préavis de retraite de la CC 2098", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category                                     | seniority | expectedResult
      ${"Employés"}                                | ${5}      | ${1}
      ${"Employés"}                                | ${6}      | ${1}
      ${"Employés"}                                | ${24}     | ${1}
      ${"Employés"}                                | ${25}     | ${1}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${5}      | ${2}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${6}      | ${1}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${24}     | ${2}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${25}     | ${2}
      ${"Cadres"}                                  | ${5}      | ${2}
      ${"Cadres"}                                  | ${6}      | ${1}
      ${"Cadres"}                                  | ${24}     | ${2}
      ${"Cadres"}                                  | ${25}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult, category }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle": `'${category}'`,
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

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category                                     | seniority | expectedResult
      ${"Employés"}                                | ${5}      | ${1}
      ${"Employés"}                                | ${6}      | ${1}
      ${"Employés"}                                | ${24}     | ${2}
      ${"Employés"}                                | ${25}     | ${2}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${5}      | ${2}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${6}      | ${2}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${24}     | ${2}
      ${"Techniciens et agents de maîtrise (TAM)"} | ${25}     | ${2}
      ${"Cadres"}                                  | ${5}      | ${3}
      ${"Cadres"}                                  | ${6}      | ${3}
      ${"Cadres"}                                  | ${24}     | ${3}
      ${"Cadres"}                                  | ${25}     | ${3}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . catégorie professionnelle": `'${category}'`,
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
