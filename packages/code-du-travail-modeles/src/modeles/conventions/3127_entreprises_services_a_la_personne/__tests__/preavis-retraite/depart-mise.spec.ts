import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const CommonDepartReference = [
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 1.1',
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
  },
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 4',
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
  },
];

const CommonMiseReference = [
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 1.1',
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
  },
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 3',
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
  },
];

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  ...CommonDepartReference,
];

const MiseRetraiteCcReferences = [
  ...MiseRetraiteReferences,
  ...CommonMiseReference,
];

describe("Préavis de retraite de la CC 3127", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${0}
      ${6}      | ${1}
      ${24}     | ${2}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC3127'",
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

  describe("Vérification des mises à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${0}
      ${6}      | ${1}
      ${24}     | ${2}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC3127'",
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
