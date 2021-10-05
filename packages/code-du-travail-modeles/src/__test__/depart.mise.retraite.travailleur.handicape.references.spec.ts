import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());

const HandicapeReferences = {
  article: "Article L5213-9",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006903707/",
};

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(HandicapeReferences)}
  ${"depart"} | ${DepartRetraiteReferences.concat(HandicapeReferences)}
`(
  "Vérification des références juridiques pour un employé handicapé en case de $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "''",
        "contrat salarié . ancienneté": "24",
        "contrat salarié . travailleur handicapé": "oui",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
