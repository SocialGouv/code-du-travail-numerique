import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());
const AllRetraite = [
  {
    article: "Article 35",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000018649415/?idConteneur=KALICONT000005635418",
  },
  {
    article: "Article 13",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000018649420/?idConteneur=KALICONT000005635418",
  },
];
const MiseRetraite = [...MiseRetraiteReferences, ...AllRetraite];
const DepartRetraite = [...DepartRetraiteReferences, ...AllRetraite];

describe("Vérification des références juridiques", () => {
  test.each`
    retirement  | category       | expectedReferences
    ${"mise"}   | ${"Employés"}  | ${MiseRetraite}
    ${"mise"}   | ${"Maîtrises"} | ${MiseRetraite}
    ${"mise"}   | ${"Cadres"}    | ${MiseRetraite}
    ${"depart"} | ${"Employés"}  | ${DepartRetraite}
    ${"depart"} | ${"Maîtrises"} | ${DepartRetraite}
    ${"depart"} | ${"Cadres"}    | ${DepartRetraite}
  `(
    "Pour un $category en $retirement à la retraite",
    ({ retirement, expectedReferences, category }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . ancienneté": 5,
          "contrat salarié . convention collective": "'IDCC1266'",
          "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
          "contrat salarié . mise à la retraite":
            retirement === "mise" ? "oui" : "non",
          "contrat salarié . travailleur handicapé": "non",
          "préavis de retraite": "oui",
        })
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
