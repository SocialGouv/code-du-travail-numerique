import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import { getReferences } from "../utils/GetReferences";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";

const engine = new Engine(mergeModels());

const CommonReferences = [
  {
    article: "Article 34",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023759236/?idConteneur=KALICONT000005635413",
  },
  {
    article: "Article 32",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023759231/?idConteneur=KALICONT000005635413",
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

describe("Convention collective 1527", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      category                  | seniority | expectedResult
      ${"Employés et ouvriers"} | ${5}      | ${1}
      ${"Employés et ouvriers"} | ${6}      | ${1}
      ${"Employés et ouvriers"} | ${24}     | ${2}
      ${"Employés et ouvriers"} | ${25}     | ${2}
      ${"Agents de maîtrise"}   | ${5}      | ${1}
      ${"Agents de maîtrise"}   | ${6}      | ${1}
      ${"Agents de maîtrise"}   | ${24}     | ${2}
      ${"Agents de maîtrise"}   | ${25}     | ${2}
      ${"Cadres non-VRP"}       | ${5}      | ${3}
      ${"Cadres non-VRP"}       | ${6}      | ${1}
      ${"Cadres non-VRP"}       | ${24}     | ${2}
      ${"Cadres non-VRP"}       | ${25}     | ${2}
      ${"Cadres VRP"}           | ${5}      | ${1}
      ${"Cadres VRP"}           | ${6}      | ${1}
      ${"Cadres VRP"}           | ${24}     | ${2}
      ${"Cadres VRP"}           | ${25}     | ${2}
      ${"Négociateur non-VRP"}  | ${5}      | ${1}
      ${"Négociateur non-VRP"}  | ${6}      | ${1}
      ${"Négociateur non-VRP"}  | ${24}     | ${2}
      ${"Négociateur non-VRP"}  | ${25}     | ${2}
      ${"Négociateur VRP"}      | ${5}      | ${1}
      ${"Négociateur VRP"}      | ${6}      | ${1}
      ${"Négociateur VRP"}      | ${15}     | ${1}
      ${"Négociateur VRP"}      | ${24}     | ${2}
      ${"Négociateur VRP"}      | ${25}     | ${2}
    `(
      "Pour un employé de tel catégorie : $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1527'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "non",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . immobilier . catégorie professionnelle": `'${category}'`,
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
      category                  | seniority | expectedResult
      ${"Employés et ouvriers"} | ${5}      | ${1}
      ${"Employés et ouvriers"} | ${6}      | ${1}
      ${"Employés et ouvriers"} | ${24}     | ${2}
      ${"Employés et ouvriers"} | ${25}     | ${2}
      ${"Agents de maîtrise"}   | ${5}      | ${1}
      ${"Agents de maîtrise"}   | ${6}      | ${1}
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
      "Pour un employé de tel catégorie : $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1527'",
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . mise à la retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
          "contrat salarié . convention collective . immobilier . catégorie professionnelle": `'${category}'`,
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
