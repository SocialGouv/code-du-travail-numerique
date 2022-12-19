import Engine from "publicodes";

import modeles from "../../../../../../src/modeles/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const Article_15_03_1_3 = [
  {
    article: "Article 15.03.1.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029952839",
  },
];

const Article_15_02_2_1 = [
  {
    article: "Article 15.02.2.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029952849",
  },
];

test.each`
  retirement  | category           | seniority | expectedReferences
  ${"départ"} | ${"Non-cadres"}    | ${12}     | ${DepartRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
  ${"départ"} | ${"Directeurs"}    | ${12}     | ${DepartRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
  ${"départ"} | ${"Directeurs"}    | ${25}     | ${DepartRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
  ${"départ"} | ${"Autres cadres"} | ${12}     | ${DepartRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
  ${"mise"}   | ${"Non-cadres"}    | ${12}     | ${MiseRetraiteReferences.concat(Article_15_03_1_3)}
  ${"mise"}   | ${"Directeurs"}    | ${12}     | ${MiseRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
  ${"mise"}   | ${"Directeurs"}    | ${25}     | ${MiseRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
  ${"mise"}   | ${"Autres cadres"} | ${12}     | ${MiseRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
  ${"mise"}   | ${"Autres cadres"} | ${25}     | ${MiseRetraiteReferences.concat(Article_15_03_1_3, Article_15_02_2_1)}
`(
  "Vérification des références juridiques pour un $category avec une ancienneté de $seniority mois en $retirement à la retraite",
  ({ retirement, category, seniority, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": seniority,
        "contrat salarié . convention collective": "'IDCC0029'",
        "contrat salarié . convention collective . hospitalisation privée à but non lucratif . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
