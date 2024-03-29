import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReferences = [
  {
    article:
      "Accord collectif national du 13 avril 2004 relatif au départ et à la mise à la retraite dans le bâtiment et les travaux publics, article 4",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005706582/?idConteneur=KALICONT000005635120",
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

describe("Convention collective 1702", () => {
  describe("Vérification des départs à la retraite et des références juridiques", () => {
    test.each`
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${1}
      ${24}     | ${2}
      ${25}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1702'",
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
      seniority | expectedResult
      ${5}      | ${2}
      ${6}      | ${2}
      ${24}     | ${2}
      ${25}     | ${2}
    `(
      "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ seniority, expectedResult }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . ancienneté": seniority,
            "contrat salarié . convention collective": "'IDCC1702'",
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
