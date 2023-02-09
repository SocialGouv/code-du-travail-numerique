import Engine from "publicodes";

import modeles from "../../../../../src/modeles/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../__test__/common/legal-references";
import { getReferences } from "../references";

const engine = new Engine(modeles as any);

const CommonReferences = [
  {
    article: "Article 4.4.2.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021063914/?idConteneur=KALICONT000017577652",
  },
  {
    article: "Article 4.4.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000021063914/?idConteneur=KALICONT000017577652",
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

describe("Convention collective 2511", () => {
  describe("Pour un départ et une mise à la retraite", () => {
    test.each`
      category         | miseRetraite | expectedReferences
      ${"Ouvriers"}    | ${"non"}     | ${DepartRetraiteCcReferences}
      ${"Ouvriers"}    | ${"oui"}     | ${MiseRetraiteCcReferences}
      ${"Techniciens"} | ${"non"}     | ${DepartRetraiteCcReferences}
      ${"Techniciens"} | ${"oui"}     | ${MiseRetraiteCcReferences}
      ${"Cadres"}      | ${"non"}     | ${DepartRetraiteCcReferences}
      ${"Cadres"}      | ${"oui"}     | ${MiseRetraiteCcReferences}
    `(
      "Pour un $category possédant $seniority mois d'ancienneté, son préavis devrait être $expectedResult mois",
      ({ category, miseRetraite, expectedReferences }) => {
        const situation = engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC2511'",
          "contrat salarié . convention collective . sport . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite": miseRetraite,
          "contrat salarié . préavis de retraite": "oui",
          "contrat salarié . travailleur handicapé": "non",
        });
        const references = getReferences(situation);
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
