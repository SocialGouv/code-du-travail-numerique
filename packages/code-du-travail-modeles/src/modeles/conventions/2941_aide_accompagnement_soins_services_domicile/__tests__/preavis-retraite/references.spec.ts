import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergePreavisRetraiteModels());

const MiseRetraiteReferencesBad = [
  {
    article: "Titre IV, article 26.1 et Titre IV, article 29",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000025805633/?idConteneur=KALICONT000025805800",
  },
].concat(MiseRetraiteReferences);
test("Vérification des références juridiques pour un employéen en depart à la retraite", () => {
  const result = getReferences(
    engine.setSituation({
      "contrat salarié . ancienneté": 6,
      "contrat salarié . convention collective": "'IDCC2941'",
      "contrat salarié . convention collective . bad . catégorie professionnelle": `'A, B, C ou D'`,
      "contrat salarié . mise à la retraite": "non",
      "contrat salarié . travailleur handicapé": "non",
    })
  );

  expect(result).toHaveLength(DepartRetraiteReferences.length);
  expect(result).toEqual(expect.arrayContaining(DepartRetraiteReferences));
});

test.each`
  category          | expectedReferences
  ${"A, B, C ou D"} | ${MiseRetraiteReferencesBad}
  ${"E ou F"}       | ${MiseRetraiteReferencesBad}
  ${"G, H ou I"}    | ${MiseRetraiteReferencesBad}
`(
  "Vérification des références juridiques pour un $category mise à la retraite",
  ({ category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 6,
        "contrat salarié . convention collective": "'IDCC2941'",
        "contrat salarié . convention collective . bad . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
