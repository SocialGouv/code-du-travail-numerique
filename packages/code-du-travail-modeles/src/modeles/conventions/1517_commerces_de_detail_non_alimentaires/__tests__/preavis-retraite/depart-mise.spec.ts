import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReference = {
  article: "Chapitre VI, article 1er",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000026803725/?idConteneur=KALICONT000005635870",
};

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  CommonReference,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Préavis de retraite de la CC 1517", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${1}
      ${6}      | ${1}
      ${24}     | ${2}
      ${5}      | ${1}
      ${6}      | ${1}
      ${24}     | ${2}
      ${5}      | ${1}
      ${6}      | ${1}
      ${24}     | ${2}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1517'",
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
      category                            | seniority | expectedResult
      ${"Employés (Niveaux I à V)"}       | ${5}      | ${1}
      ${"Employés (Niveaux I à V)"}       | ${6}      | ${1}
      ${"Employés (Niveaux I à V)"}       | ${24}     | ${2}
      ${"Agents de maîtrise (Niveau VI)"} | ${5}      | ${2}
      ${"Agents de maîtrise (Niveau VI)"} | ${6}      | ${2}
      ${"Agents de maîtrise (Niveau VI)"} | ${24}     | ${2}
      ${"Cadres (Niveaux VII à IX)"}      | ${5}      | ${3}
      ${"Cadres (Niveaux VII à IX)"}      | ${6}      | ${3}
      ${"Cadres (Niveaux VII à IX)"}      | ${24}     | ${3}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1517'",
            "contrat salarié . convention collective . commerces de detail non alimentaires . catégorie professionnelle": `'${category}'`,
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
