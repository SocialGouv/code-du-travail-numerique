import Engine from "publicodes";

import { getReferences } from "../../../";
import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

const References = [
  {
    article: "Article 9.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005775560?idConteneur=KALICONT000005635435",
  },
];

describe("Vérification des références juridiques pour la CC 2511", () => {
  test.each`
    seniority | inaptitude | expectedReferences
    ${5}      | ${"non"}   | ${References}
    ${5}      | ${"oui"}   | ${References}
    ${6}      | ${"non"}   | ${References}
    ${6}      | ${"oui"}   | ${References}
    ${24}     | ${"non"}   | ${References}
    ${24}     | ${"oui"}   | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, inaptitude, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1516'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          "indemnité de licenciement": "oui",
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
