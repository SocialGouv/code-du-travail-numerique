import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const MiseRetraite = [
  {
    article: "Article 25 § 1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027745280/?idConteneur=KALICONT000005635409",
  },
];

test.each`
  retirement  | category        | expectedReferences
  ${"mise"}   | ${"Cadres"}     | ${MiseRetraiteReferences.concat(MiseRetraite)}
  ${"mise"}   | ${"Non-cadres"} | ${MiseRetraiteReferences.concat(MiseRetraite)}
  ${"depart"} | ${"Cadres"}     | ${DepartRetraiteReferences}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, expectedReferences, category }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC1147'",
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
