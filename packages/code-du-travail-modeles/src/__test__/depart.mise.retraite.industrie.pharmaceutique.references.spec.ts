import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());

const DepartRetraitePharmaReferences = [
  {
    article: "Article 34",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022189666?idConteneur=KALICONT000005635184",
  },
  {
    article: "Article 32.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022189662?idConteneur=KALICONT000005635184",
  },
];
const MiseRetraitePharmaReferences = [
  {
    article: "Article 35",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005857748?idConteneur=KALICONT000005635184",
  },
  {
    article: "Article 32.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022189662?idConteneur=KALICONT000005635184",
  },
];

test.each`
  retirement  | expectedReferences
  ${"mise"}   | ${MiseRetraiteReferences.concat(MiseRetraitePharmaReferences)}
  ${"départ"} | ${DepartRetraiteReferences.concat(DepartRetraitePharmaReferences)}
`(
  "Vérification des références juridiques pour un employé en $retirement à la retraite",
  ({ retirement, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . ancienneté": 6,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . convention collective . industrie pharmaceutique . conclu après 1 juillet 2019":
          "oui",
        "contrat salarié . convention collective . industrie pharmaceutique . groupe": 5,
      })
    );

    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
