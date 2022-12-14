import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const DepartRetraiteToutesCategoriesReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 4.11.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172424?idConteneur=KALICONT000027172335",
  },
];

const MiseRetraiteToutesCategoriesReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 4.11.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172424?idConteneur=KALICONT000027172335",
  },
  {
    article: "Article 4.12.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172426?idConteneur=KALICONT000027172335",
  },
];

test.each`
  retirement  | category                                     | expectedReferences
  ${"départ"} | ${"Agents de propreté"}                      | ${DepartRetraiteToutesCategoriesReferences}
  ${"départ"} | ${"Employés"}                                | ${DepartRetraiteToutesCategoriesReferences}
  ${"départ"} | ${"Techniciens et Agents de maîtrise (TAM)"} | ${DepartRetraiteToutesCategoriesReferences}
  ${"départ"} | ${"Cadres"}                                  | ${DepartRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Agents de propreté"}                      | ${MiseRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Employés"}                                | ${MiseRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Techniciens et Agents de maîtrise (TAM)"} | ${MiseRetraiteToutesCategoriesReferences}
  ${"mise"}   | ${"Cadres"}                                  | ${MiseRetraiteToutesCategoriesReferences}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC3043'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
