import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());

const DépartRetraiteNonLogéInférieur602References = [
  ...DepartRetraiteReferences,
  {
    article: "Article 14",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635953",
  },
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];
const DépartRetraiteNonLogéSupérieur602References = [
  ...DepartRetraiteReferences,
  {
    article: "Article 14",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635954",
  },
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];
const DépartRetraiteLogéReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 14",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635955",
  },
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];

const MiseRetraiteCatAReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 14",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635953",
  },
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];

const MiseRetraiteCatBReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 17",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];

test.each`
  retirement  | category         | accommodation | coefficient | expectedReferences
  ${"départ"} | ${"Catégorie A"} | ${"Oui"}      | ${602}      | ${DépartRetraiteLogéReferences}
  ${"départ"} | ${"Catégorie B"} | ${"Oui"}      | ${602}      | ${DépartRetraiteLogéReferences}
  ${"départ"} | ${"Catégorie A"} | ${"Non"}      | ${602}      | ${DépartRetraiteNonLogéInférieur602References}
  ${"départ"} | ${"Catégorie B"} | ${"Non"}      | ${602}      | ${DépartRetraiteNonLogéInférieur602References}
  ${"départ"} | ${"Catégorie A"} | ${"Non"}      | ${603}      | ${DépartRetraiteNonLogéSupérieur602References}
  ${"départ"} | ${"Catégorie B"} | ${"Non"}      | ${603}      | ${DépartRetraiteNonLogéSupérieur602References}
  ${"départ"} | ${"Catégorie A"} | ${"Oui"}      | ${603}      | ${DépartRetraiteLogéReferences}
  ${"départ"} | ${"Catégorie B"} | ${"Oui"}      | ${603}      | ${DépartRetraiteLogéReferences}
  ${"mise"}   | ${"Catégorie A"} | ${"Oui"}      | ${602}      | ${MiseRetraiteCatAReferences}
  ${"mise"}   | ${"Catégorie B"} | ${"Oui"}      | ${602}      | ${MiseRetraiteCatBReferences}
  ${"mise"}   | ${"Catégorie A"} | ${"Non"}      | ${602}      | ${MiseRetraiteCatAReferences}
  ${"mise"}   | ${"Catégorie B"} | ${"Non"}      | ${602}      | ${MiseRetraiteCatBReferences}
  ${"mise"}   | ${"Catégorie A"} | ${"Non"}      | ${603}      | ${MiseRetraiteCatAReferences}
  ${"mise"}   | ${"Catégorie B"} | ${"Non"}      | ${603}      | ${MiseRetraiteCatBReferences}
  ${"mise"}   | ${"Catégorie A"} | ${"Oui"}      | ${603}      | ${MiseRetraiteCatAReferences}
  ${"mise"}   | ${"Catégorie B"} | ${"Oui"}      | ${603}      | ${MiseRetraiteCatBReferences}
`(
  "Vérification des références juridiques pour un salarié $category en $retirement à la retraite ayant un logement : $accommodation et avec ce coefficient $coefficient",
  ({
    retirement,
    category,
    expectedReferences,
    accommodation,
    coefficient,
  }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1043'",
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . convention collective . gardien concierge . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . gardien concierge . logement": `'${accommodation}'`,
        "contrat salarié . convention collective . gardien concierge . coefficient": `'${coefficient}'`,
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
