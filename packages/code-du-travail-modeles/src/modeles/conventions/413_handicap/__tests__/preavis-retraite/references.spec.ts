import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergePreavisRetraiteModels());

const MiseAlaRetraiteNonCadres = [
  {
    article: "Article 16",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005863125/?idConteneur=KALICONT000005635407",
  },
];
const MiseAlaRetraiteCadres = [
  {
    article: "Annexe n° 6 Dispositions spéciales aux cadres, article 9",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022837394?idConteneur=KALICONT000005635407",
  },
];

const DepartRetraiteNonCadres = [
  {
    article: "Article 16",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005863125/?idConteneur=KALICONT000005635407",
  },
  {
    article: "Article 18",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005863127/?idConteneur=KALICONT000005635407",
  },
];
const DepartRetraiteCadres = [
  {
    article: "Article 16",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005863125/?idConteneur=KALICONT000005635407",
  },
  {
    article: "Article 18",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005863127/?idConteneur=KALICONT000005635407",
  },
  {
    article: "Annexe n° 6 Dispositions spéciales aux cadres, article 9",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022837394?idConteneur=KALICONT000005635407",
  },
];

test.each`
  retirement  | category                                                   | expectedReferences
  ${"mise"}   | ${"'Non cadres'"}                                          | ${MiseRetraiteReferences.concat(MiseAlaRetraiteNonCadres)}
  ${"mise"}   | ${"'Autres cadres'"}                                       | ${MiseRetraiteReferences.concat(MiseAlaRetraiteCadres)}
  ${"mise"}   | ${"'Directeurs de service'"}                               | ${MiseRetraiteReferences.concat(MiseAlaRetraiteCadres)}
  ${"mise"}   | ${"'Directeurs d'établissement'"}                          | ${MiseRetraiteReferences.concat(MiseAlaRetraiteCadres)}
  ${"mise"}   | ${"'Directeurs de centre de formation en travail social'"} | ${MiseRetraiteReferences.concat(MiseAlaRetraiteCadres)}
  ${"mise"}   | ${"'Directeurs généraux'"}                                 | ${MiseRetraiteReferences.concat(MiseAlaRetraiteCadres)}
  ${"départ"} | ${"'Non cadres'"}                                          | ${DepartRetraiteReferences.concat(DepartRetraiteNonCadres)}
  ${"départ"} | ${"'Autres cadres'"}                                       | ${DepartRetraiteReferences.concat(DepartRetraiteCadres)}
  ${"départ"} | ${"'Directeurs de service'"}                               | ${DepartRetraiteReferences.concat(DepartRetraiteCadres)}
  ${"départ"} | ${"'Directeurs d'établissement'"}                          | ${DepartRetraiteReferences.concat(DepartRetraiteCadres)}
  ${"départ"} | ${"'Directeurs de centre de formation en travail social'"} | ${DepartRetraiteReferences.concat(DepartRetraiteCadres)}
  ${"départ"} | ${"'Directeurs généraux'"}                                 | ${DepartRetraiteReferences.concat(DepartRetraiteCadres)}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 6,
        "contrat salarié . convention collective": "'IDCC0413'",
        "contrat salarié . convention collective . établissement handicap . catégorie professionnelle": category,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
