import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());

const MiseRetraiteNonCadresReferences = [
  {
    article: "Article 41",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000026801989/?idConteneur=KALICONT000005635373",
  },
];
const MiseRetraiteCadresReferences = [
  {
    article: "Avenant n°I relatif aux cadres Article 5",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005836506/?idConteneur=KALICONT000005635373",
  },
];

test.each`
  retirement  | category                | expectedReferences
  ${"départ"} | ${"Ouvriers"}           | ${DepartRetraiteReferences}
  ${"mise"}   | ${"Ouvriers"}           | ${MiseRetraiteReferences.concat(MiseRetraiteNonCadresReferences)}
  ${"mise"}   | ${"Employés"}           | ${MiseRetraiteReferences.concat(MiseRetraiteNonCadresReferences)}
  ${"mise"}   | ${"Agents de maîtrise"} | ${MiseRetraiteReferences.concat(MiseRetraiteNonCadresReferences)}
  ${"mise"}   | ${"Techniciens"}        | ${MiseRetraiteReferences.concat(MiseRetraiteNonCadresReferences)}
  ${"mise"}   | ${"Cadres"}             | ${MiseRetraiteReferences.concat(MiseRetraiteCadresReferences)}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . ancienneté": 6,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
      })
    );

    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
