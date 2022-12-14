import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = SingletonEnginePublicodes.getInstance();

const References = [
  {
    article: "Article 6.2.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005719412/?idConteneur=KALICONT000005635826",
  },
];

describe("Vérification des références juridiques pour la CC 787", () => {
  test.each`
    seniority | expectedReferences
    ${5}      | ${References}
    ${6}      | ${References}
    ${24}     | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0787'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
