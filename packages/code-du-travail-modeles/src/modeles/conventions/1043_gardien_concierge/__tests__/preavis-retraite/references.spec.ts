import Engine from "publicodes";

import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { mergePreavisRetraiteModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergePreavisRetraiteModels());

const DépartRetraiteNonLogéInférieur602References = [
  ...DepartRetraiteReferences,
  {
    article: "Article 14",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635953",
  },
  {
    article: "Article 17",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];
const DépartRetraiteNonLogéSupérieur602References = [
  ...DepartRetraiteReferences,
  {
    article: "Article 14",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635954",
  },
  {
    article: "Article 17",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];
const DépartRetraiteLogéReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 14",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635955",
  },
  {
    article: "Article 17",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];

const MiseRetraiteCatAReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 14",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978399/?idConteneur=KALICONT000005635953",
  },
  {
    article: "Article 17",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];

const MiseRetraiteCatBReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 17",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000034978485/?idConteneur=KALICONT000005635953",
  },
];

describe("Vérification juridiques de la CC 1043", () => {
  describe("Départ à la retraite", () => {
    test.each`
      category         | accommodation | coefficient | expectedReferences
      ${"Catégorie A"} | ${"Oui"}      | ${602}      | ${DépartRetraiteLogéReferences}
      ${"Catégorie B"} | ${"Oui"}      | ${602}      | ${DépartRetraiteLogéReferences}
      ${"Catégorie A"} | ${"Non"}      | ${602}      | ${DépartRetraiteNonLogéInférieur602References}
      ${"Catégorie B"} | ${"Non"}      | ${602}      | ${DépartRetraiteNonLogéInférieur602References}
      ${"Catégorie A"} | ${"Non"}      | ${603}      | ${DépartRetraiteNonLogéSupérieur602References}
      ${"Catégorie B"} | ${"Non"}      | ${603}      | ${DépartRetraiteNonLogéSupérieur602References}
      ${"Catégorie A"} | ${"Oui"}      | ${603}      | ${DépartRetraiteLogéReferences}
      ${"Catégorie B"} | ${"Oui"}      | ${603}      | ${DépartRetraiteLogéReferences}
    `(
      "Vérification des références juridiques pour un salarié $category en $retirement à la retraite ayant un logement : $accommodation et avec ce coefficient $coefficient",
      ({ category, expectedReferences, accommodation, coefficient }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC1043'",
            "contrat salarié . convention collective . gardien concierge . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . gardien concierge . coefficient": `'${coefficient}'`,
            "contrat salarié . convention collective . gardien concierge . logement": `'${accommodation}'`,
            "contrat salarié . mise à la retraite": "non",
            "contrat salarié . travailleur handicapé": "non",
          })
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Mise à la retraite", () => {
    test.each`
      category         | accommodation | coefficient | expectedReferences
      ${"Catégorie A"} | ${"Oui"}      | ${602}      | ${MiseRetraiteCatAReferences}
      ${"Catégorie B"} | ${"Oui"}      | ${602}      | ${MiseRetraiteCatBReferences}
      ${"Catégorie A"} | ${"Non"}      | ${602}      | ${MiseRetraiteCatAReferences}
      ${"Catégorie B"} | ${"Non"}      | ${602}      | ${MiseRetraiteCatBReferences}
      ${"Catégorie A"} | ${"Non"}      | ${603}      | ${MiseRetraiteCatAReferences}
      ${"Catégorie B"} | ${"Non"}      | ${603}      | ${MiseRetraiteCatBReferences}
      ${"Catégorie A"} | ${"Oui"}      | ${603}      | ${MiseRetraiteCatAReferences}
      ${"Catégorie B"} | ${"Oui"}      | ${603}      | ${MiseRetraiteCatBReferences}
    `(
      "Vérification des références juridiques pour un salarié $category en $retirement à la retraite ayant un logement : $accommodation et avec ce coefficient $coefficient",
      ({ category, expectedReferences, accommodation, coefficient }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC1043'",
            "contrat salarié . convention collective . gardien concierge . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . gardien concierge . coefficient": `'${coefficient}'`,
            "contrat salarié . convention collective . gardien concierge . logement": `'${accommodation}'`,
            "contrat salarié . mise à la retraite": "oui",
            "contrat salarié . travailleur handicapé": "non",
          })
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
