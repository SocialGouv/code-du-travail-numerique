import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1266"
);

const References = [
  {
    article: "Article 14",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000021822343?idConteneur=KALICONT000005635418",
  },
];

describe("Vérification des références juridiques pour la CC 1266", () => {
  test.each`
    seniority | category        | expectedReferences
    ${5}      | ${"Non-Cadres"} | ${References}
    ${5}      | ${"Cadres"}     | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, category, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1266'",

        "contrat salarié . convention collective . restauration collectivités . catégorie professionnelle": `'${category}'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
