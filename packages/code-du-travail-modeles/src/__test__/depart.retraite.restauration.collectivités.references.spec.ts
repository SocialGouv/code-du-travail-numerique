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
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(AllRetraite)}
  ${"depart"} | ${DepartRetraiteReferences.concat(AllRetraite)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1266'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
        "contrat salarié . ancienneté": 5,
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
