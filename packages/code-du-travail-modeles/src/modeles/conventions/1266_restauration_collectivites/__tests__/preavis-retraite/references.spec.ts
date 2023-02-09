import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);
const AllRetraite = [
  {
    article: "Article 35",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000018649415/?idConteneur=KALICONT000005635418",
  },
  {
    article: "Article 13",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000018649420/?idConteneur=KALICONT000005635418",
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
      engine.setSituation({
        "contrat salarié . ancienneté": "5",
        "contrat salarié . convention collective": "'IDCC1266'",
        "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.getReferences();

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
