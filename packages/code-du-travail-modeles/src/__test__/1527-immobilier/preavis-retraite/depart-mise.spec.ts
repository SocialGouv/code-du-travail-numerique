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
    article: "Article 34",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042096649#KALIARTI000042096649",
  },
  {
    article: "Article 32",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042096655#KALIARTI000042096655",
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

describe("Préavis de retraite de la CC 1527", () => {
  describe("Départ à la retraite", () => {
    test.each`
      category                  | seniority | expectedResult
      ${"Employés et ouvriers"} | ${5}      | ${1}
      ${"Employés et ouvriers"} | ${6}      | ${1}
      ${"Employés et ouvriers"} | ${24}     | ${2}
      ${"Employés et ouvriers"} | ${25}     | ${2}
      ${"Agents de maîtrise"}   | ${5}      | ${1}
      ${"Agents de maîtrise"}   | ${6}      | ${1}
      ${"Agents de maîtrise"}   | ${11}     | ${1}
      ${"Agents de maîtrise"}   | ${12}     | ${1}
      ${"Agents de maîtrise"}   | ${24}     | ${2}
      ${"Agents de maîtrise"}   | ${25}     | ${2}
      ${"Cadres non-VRP"}       | ${5}      | ${3}
      ${"Cadres non-VRP"}       | ${6}      | ${1}
      ${"Cadres non-VRP"}       | ${24}     | ${2}
      ${"Cadres non-VRP"}       | ${25}     | ${2}
      ${"Cadres VRP"}           | ${5}      | ${1}
      ${"Cadres VRP"}           | ${6}      | ${1}
      ${"Cadres VRP"}           | ${11}     | ${1}
      ${"Cadres VRP"}           | ${12}     | ${1}
      ${"Cadres VRP"}           | ${24}     | ${2}
      ${"Cadres VRP"}           | ${25}     | ${2}
      ${"Négociateur non-VRP"}  | ${5}      | ${1}
      ${"Négociateur non-VRP"}  | ${6}      | ${1}
      ${"Négociateur non-VRP"}  | ${24}     | ${2}
      ${"Négociateur non-VRP"}  | ${25}     | ${2}
      ${"Négociateur VRP"}      | ${5}      | ${1}
      ${"Négociateur VRP"}      | ${6}      | ${1}
      ${"Négociateur VRP"}      | ${11}     | ${1}
      ${"Négociateur VRP"}      | ${12}     | ${1}
      ${"Négociateur VRP"}      | ${15}     | ${1}
      ${"Négociateur VRP"}      | ${24}     | ${2}
      ${"Négociateur VRP"}      | ${25}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1527'",
          "contrat salarié . convention collective . immobilier . catégorie professionnelle": `'${category}'`,
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

  describe("Mise à la retraite", () => {
    test.each`
      category                  | seniority | expectedResult
      ${"Employés et ouvriers"} | ${5}      | ${1}
      ${"Employés et ouvriers"} | ${6}      | ${1}
      ${"Employés et ouvriers"} | ${24}     | ${2}
      ${"Employés et ouvriers"} | ${25}     | ${2}
      ${"Agents de maîtrise"}   | ${5}      | ${1}
      ${"Agents de maîtrise"}   | ${6}      | ${1}
      ${"Agents de maîtrise"}   | ${11}     | ${1}
      ${"Agents de maîtrise"}   | ${12}     | ${2}
      ${"Agents de maîtrise"}   | ${24}     | ${2}
      ${"Agents de maîtrise"}   | ${25}     | ${2}
      ${"Cadres non-VRP"}       | ${5}      | ${3}
      ${"Cadres non-VRP"}       | ${6}      | ${3}
      ${"Cadres non-VRP"}       | ${24}     | ${3}
      ${"Cadres non-VRP"}       | ${25}     | ${3}
      ${"Cadres VRP"}           | ${5}      | ${3}
      ${"Cadres VRP"}           | ${6}      | ${3}
      ${"Cadres VRP"}           | ${24}     | ${3}
      ${"Cadres VRP"}           | ${25}     | ${3}
      ${"Négociateur non-VRP"}  | ${5}      | ${1}
      ${"Négociateur non-VRP"}  | ${6}      | ${1}
      ${"Négociateur non-VRP"}  | ${24}     | ${2}
      ${"Négociateur non-VRP"}  | ${25}     | ${2}
      ${"Négociateur VRP"}      | ${5}      | ${1}
      ${"Négociateur VRP"}      | ${6}      | ${1}
      ${"Négociateur VRP"}      | ${15}     | ${2}
      ${"Négociateur VRP"}      | ${24}     | ${3}
      ${"Négociateur VRP"}      | ${25}     | ${3}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1527'",
          "contrat salarié . convention collective . immobilier . catégorie professionnelle": `'${category}'`,
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
