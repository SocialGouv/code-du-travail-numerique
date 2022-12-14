import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-indemnite-licenciement.json";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const References = [
  {
    article: "Article 4.4.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000018072830/?idConteneur=KALICONT000005635177",
  },
  {
    article: "Article 6.3.4",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027717742?idConteneur=KALICONT000005635177&origin=list#KALIARTI000027717742",
  },
];

describe("Vérification des références juridiques pour la CC 1518", () => {
  test.each`
    seniority | inaptitude | expectedReferences
    ${5}      | ${"non"}   | ${References}
    ${5}      | ${"oui"}   | ${References}
    ${6}      | ${"non"}   | ${References}
    ${6}      | ${"oui"}   | ${References}
    ${24}     | ${"non"}   | ${References}
    ${24}     | ${"oui"}   | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority ans",
    ({ seniority, inaptitude, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1518'",
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
