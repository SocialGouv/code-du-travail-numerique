import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());
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

test.each`
  retirement  | category       | expectedReferences
  ${"mise"}   | ${"Employés"}  | ${MiseRetraiteReferences.concat(AllRetraite)}
  ${"mise"}   | ${"Maîtrises"} | ${MiseRetraiteReferences.concat(AllRetraite)}
  ${"mise"}   | ${"Cadres"}    | ${MiseRetraiteReferences.concat(AllRetraite)}
  ${"depart"} | ${"Employés"}  | ${DepartRetraiteReferences.concat(AllRetraite)}
  ${"depart"} | ${"Maîtrises"} | ${DepartRetraiteReferences.concat(AllRetraite)}
  ${"depart"} | ${"Cadres"}    | ${DepartRetraiteReferences.concat(AllRetraite)}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, expectedReferences, category }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1266'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
