import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonDepartReference = [
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 1.1',
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
  },
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 4',
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
  },
];

const CommonMiseReference = [
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 1.1',
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
  },
  {
    article:
      'Partie 2, chapitre IV, section 1 "Cessation du contrat à durée indéterminée", article 3',
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027034201/?idConteneur=KALICONT000027084096",
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
      seniority | expectedResult | expectedUnit
      ${5}      | ${0}           | ${"semaines"}
      ${6}      | ${1}           | ${"mois"}
      ${24}     | ${2}           | ${"mois"}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult, expectedUnit }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC3127'",
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual(expectedUnit);
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
      seniority | expectedResult | expectedUnit
      ${5}      | ${0}           | ${"semaines"}
      ${6}      | ${1}           | ${"mois"}
      ${24}     | ${2}           | ${"mois"}
    `(
      "Pour un salarié possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult, expectedUnit }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC3127'",
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
          },
          "contrat salarié . préavis de retraite en jours"
        );
        const references = engine.getReferences();

        expect(result.value).toEqual(expectedResult);
        expect(result.unit).toEqual(expectedUnit);
        expect(missingArgs).toEqual([]);
        expect(references).toHaveLength(MiseRetraiteCcReferences.length);
        expect(references).toEqual(
          expect.arrayContaining(MiseRetraiteCcReferences)
        );
      }
    );
  });
});
