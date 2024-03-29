import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const CommonReference = {
  article:
    "Accord collectif national du 13 avril 2004 relatif au départ et à la mise à la retraite dans le bâtiment et les travaux publics, article 4",
  url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005706582/?idConteneur=KALICONT000005635120",
};

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  CommonReference,
];

const MiseRetraiteCcReferences = [...MiseRetraiteReferences, CommonReference];

describe("Vérification des départs à la retraite, mise à la retraite et des références juridiques de la convention collective 1596", () => {
  test.each`
    retirement  | seniority | expectedResult | expectedReferences
    ${"depart"} | ${5}      | ${2}           | ${DepartRetraiteCcReferences}
    ${"depart"} | ${6}      | ${1}           | ${DepartRetraiteCcReferences}
    ${"depart"} | ${24}     | ${2}           | ${DepartRetraiteCcReferences}
    ${"mise"}   | ${5}      | ${2}           | ${MiseRetraiteCcReferences}
    ${"mise"}   | ${6}      | ${2}           | ${MiseRetraiteCcReferences}
    ${"mise"}   | ${24}     | ${2}           | ${MiseRetraiteCcReferences}
  `(
    "Pour un employé possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
    ({ retirement, seniority, expectedResult, expectedReferences }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "'IDCC1596'",
          "contrat salarié . mise à la retraite":
            retirement === "mise" ? "oui" : "non",
          "contrat salarié . travailleur handicapé": "non",
        },
        "contrat salarié . préavis de retraite en jours"
      );
      const references = engine.getReferences();

      expect(result.value).toEqual(expectedResult);
      expect(result.unit).toEqual("mois");
      expect(missingArgs).toEqual([]);
      expect(references).toHaveLength(expectedReferences.length);
      expect(references).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
