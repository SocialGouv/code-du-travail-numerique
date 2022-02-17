import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const MiseRetraite = [
  {
    article: "Article 8.12",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018773877?idConteneur=KALICONT000018773893",
  },
];
const DepartRetraite = [
  {
    article: "Article 8.9",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000018773872/?idConteneur=KALICONT000018773893",
  },
];

test.each`
  retirement  | expectedReferences
  ${"départ"} | ${DepartRetraiteReferences.concat(MiseRetraite)}
  ${"mise"}   | ${MiseRetraiteReferences.concat(DepartRetraite)}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 6,
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
