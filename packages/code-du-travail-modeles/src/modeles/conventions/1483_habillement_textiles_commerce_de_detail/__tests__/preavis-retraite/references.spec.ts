import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergePreavisRetraiteModels());
const DepartRetraite = [
  ...DepartRetraiteReferences,
  {
    article: "Chapitre I Article 19. a",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005840267/?idConteneur=KALICONT000005635594",
  },
  {
    article: "Chapitre II Article 12",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023097315/?idConteneur=KALICONT000005635594",
  },
];

const MiseRetraite = [
  ...MiseRetraiteReferences,
  {
    article: "Chapitre I Article 19. b",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005840267/?idConteneur=KALICONT000005635594",
  },
  {
    article: "Chapitre II Article 12",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023097315/?idConteneur=KALICONT000005635594",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraite}
  ${"depart"} | ${DepartRetraite}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 5,
        "contrat salarié . convention collective": "'IDCC1483'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
