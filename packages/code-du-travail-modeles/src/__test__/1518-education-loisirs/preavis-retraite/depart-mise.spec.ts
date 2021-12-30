import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const CommonReference = {
  article: "Article 4.4.1, Article 4.4.3 et Article 4.4.4",
  url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038525633?idConteneur=KALICONT000005635177",
};

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Préavis de retraite de la CC 1518", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${0}
      ${6}      | ${1}
      ${24}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1518'",
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
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1518'",
          "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
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
