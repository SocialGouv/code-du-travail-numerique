import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReference = {
  article: "Article 4.4.1, Article 4.4.3 et Article 4.4.4",
  url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038525633?idConteneur=KALICONT000005635177",
};

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Préavis de retraite de la CC 1518", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult | expectedUnit
      ${5}      | ${0}           | ${"semaines"}
      ${6}      | ${1}           | ${"mois"}
      ${24}     | ${2}           | ${"mois"}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult, expectedUnit }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1518'",
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

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      category                                                    | seniority | expectedResult
      ${"Ouvriers et employés (groupes 2 et 3)"}                  | ${5}      | ${1}
      ${"Ouvriers et employés (groupes 2 et 3)"}                  | ${6}      | ${1}
      ${"Ouvriers et employés (groupes 2 et 3)"}                  | ${24}     | ${2}
      ${"Ouvriers et employés (groupes 2 et 3)"}                  | ${25}     | ${2}
      ${"Techniciens et agents de maîtrise (groupes 4, 5 et 6)"}  | ${5}      | ${2}
      ${"Techniciens et agents de maîtrise (groupes 4, 5 et 6)"}  | ${6}      | ${2}
      ${"Techniciens et agents de maîtrise (groupes 4, 5 et 6)"}  | ${24}     | ${2}
      ${"Techniciens et agents de maîtrise (groupes 4, 5 et 6)"}  | ${25}     | ${2}
      ${"Cadres (groupes 7 et 8)"}                                | ${5}      | ${3}
      ${"Cadres (groupes 7 et 8)"}                                | ${6}      | ${3}
      ${"Cadres (groupes 7 et 8)"}                                | ${24}     | ${3}
      ${"Cadres (groupes 7 et 8)"}                                | ${25}     | ${3}
      ${"Animateurs techniciens et professeurs (niveaux A et B)"} | ${5}      | ${2}
      ${"Animateurs techniciens et professeurs (niveaux A et B)"} | ${6}      | ${2}
      ${"Animateurs techniciens et professeurs (niveaux A et B)"} | ${24}     | ${2}
      ${"Animateurs techniciens et professeurs (niveaux A et B)"} | ${25}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1518'",
            "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle": `'${category}'`,
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
