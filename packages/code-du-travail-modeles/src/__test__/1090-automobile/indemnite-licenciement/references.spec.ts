import Engine from "publicodes";

import { getReferences } from "../../../";
import { mergeIndemniteLicenciementModels } from "../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

const References = [
  {
    article: "Article 1.13",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005755339/?idConteneur=KALICONT000005635191",
  },
  {
    article: "Article 2.13",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000037964084?idConteneur=KALICONT000005635191&origin=list#KALIARTI000037964084",
  },
];

describe("Vérification des références juridiques pour la CC 1090", () => {
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
          "contrat salarié . convention collective": "'IDCC1090'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
