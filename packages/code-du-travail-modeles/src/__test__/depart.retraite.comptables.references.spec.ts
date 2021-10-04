import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());
const DepartRetraite = [
  {
    article: "Article 6.2.4.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000029786918/?idConteneur=KALICONT000005635826",
  },
];

const MiseRetraite = [
  {
    article: "Article 6.2.0 et Article 6.2.4.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000029786918/?idConteneur=KALICONT000005635826",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(MiseRetraite)}
  ${"depart"} | ${DepartRetraiteReferences.concat(DepartRetraite)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0787'",
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
