import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const DepartRetraiteCcReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 20",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851451/?idConteneur=KALICONT000005635173",
  },
  {
    article: "Annexe « Enquêteurs », article 26",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851324/?idConteneur=KALICONT000005635173",
  },
];

const MiseRetraiteCCReferencesAutre = [
  ...MiseRetraiteReferences,
  {
    article: "Article 20",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851451/?idConteneur=KALICONT000005635173",
  },
];

const MiseRetraiteCCReferencesCharge = [
  ...MiseRetraiteReferences,
  {
    article: "Annexe « Enquêteurs », article 26",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851324/?idConteneur=KALICONT000005635173",
  },
];

describe("Références juridiques pour le préavis de retraite de la CC 1486", () => {
  test("Départ à la retraite", () => {
    engine.setSituation({
      "contrat salarié . ancienneté": "6",
      "contrat salarié . convention collective": "'IDCC1486'",
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();
    expect(result).toHaveLength(DepartRetraiteCcReferences.length);
    expect(result).toEqual(expect.arrayContaining(DepartRetraiteCcReferences));
  });

  test.each`
    category                             | expectedReferences
    ${"Autres salariés"}                 | ${MiseRetraiteCCReferencesAutre}
    ${"Chargés d'enquête intermittents"} | ${MiseRetraiteCCReferencesCharge}
  `("Mise à la retraite", ({ category, expectedReferences }) => {
    engine.setSituation({
      "contrat salarié . ancienneté": "6",
      "contrat salarié . convention collective": "'IDCC1486'",
      "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle": `'${category}'`,
      "contrat salarié . mise à la retraite": "oui",
      "contrat salarié . travailleur handicapé": "non",
    });
    const result = engine.getReferences();

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  });
});
