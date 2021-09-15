import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());

const DepartRetraiteToutesCategoriesReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 4.11.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172424?idConteneur=KALICONT000027172335",
  },
];

const MiseRetraiteToutesCategoriesReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 4.11.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172424?idConteneur=KALICONT000027172335",
  },
  {
    article: "Article 4.12.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172426?idConteneur=KALICONT000027172335",
  },
];

test.each`
  retirement  | category                              | expectedReferences
  ${"départ"} | ${"Agents de propreté"}               | ${DepartRetraiteToutesCategoriesReferences}
  ${"départ"} | ${"Employés"}                         | ${DepartRetraiteToutesCategoriesReferences}
  ${"départ"} | ${"Techniciens & Agents de maîtrise"} | ${DepartRetraiteToutesCategoriesReferences}
  ${"départ"} | ${"Cadres"}                           | ${DepartRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Agents de propreté"}               | ${MiseRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Employés"}                         | ${MiseRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Techniciens & Agents de maîtrise"} | ${MiseRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Cadres"}                           | ${MiseRetraiteToutesCategoriesReferences}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC3043'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . convention collective . propreté entreprise . catégorie professionnelle": `'${category}'`,
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
