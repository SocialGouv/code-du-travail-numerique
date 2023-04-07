import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "86"
);

const references = [
  {
    article: "Article 31",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005753579/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 50",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005753598/?idConteneur=KALICONT000005635630",
  },
  {
    article: "Article 69",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005753616/?idConteneur=KALICONT000005635630",
  },
];

describe("Références juridiques pour l'indemnité conventionnel de licenciement pour la CC 86", () => {
  test.each`
    seniority | expectedRef
    ${1.91}   | ${[]}
    ${2}      | ${references}
    ${15}     | ${references}
    ${20}     | ${references}
  `(
    "Avec $seniority ans, catégorie $category on a $expectedRef",
    ({ seniority, expectedRef }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0086'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      });

      const result = engine.getReferences("résultat conventionnel");
      expect(result).toHaveLength(expectedRef.length);
      expect(result).toEqual(expect.arrayContaining(expectedRef));
    }
  );
});
