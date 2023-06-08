import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1043"
);

describe("Vérification des références juridiques pour la CC 1043", () => {
  const references = [
    {
      article: "Article 16",
      url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000034978460",
    },
  ];

  test.each`
    seniority | expectedReferences
    ${5}      | ${references}
    ${10}     | ${references}
    ${15}     | ${references}
    ${20}     | ${references}
    ${25}     | ${references}
  `(
    "avec une ancienneté de $seniority ans",
    ({ seniority, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1043'",
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
