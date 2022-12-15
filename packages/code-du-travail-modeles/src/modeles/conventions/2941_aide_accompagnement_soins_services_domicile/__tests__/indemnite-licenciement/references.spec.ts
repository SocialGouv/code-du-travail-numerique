import Engine from "publicodes";

import modeles from "../../../../../../src/modeles/modeles-indemnite-licenciement.json";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const References = [
  {
    article: "Article 26. 1. b.,Titre IV",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392525?idConteneur=KALICONT000025805800&origin=list#KALIARTI000044392525",
  },
  {
    article: "Article 17",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000025805624?idConteneur=KALICONT000025805800&origin=list#KALIARTI000025805624",
  },
];

describe("Vérification des références juridiques pour la CC 2941", () => {
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
          "contrat salarié . convention collective": "'IDCC2941'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
