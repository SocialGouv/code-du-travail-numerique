import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1702"
);

const refs = [
  {
    article: "Article 10.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801849?idConteneur=KALICONT000005635467",
  },
  {
    article: "Article 10.5",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801851?idConteneur=KALICONT000005635467",
  },
  {
    article: "Article 10.4",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801850?idConteneur=KALICONT000005635467&origin=list#KALIARTI000005801850",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 1702", () => {
  test("ancienneté: $seniority an, salaire de référence: $salary, type de licenciement $typeLicenciement, catégorie $category => $expectedReferences", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
        "38",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . licenciement économique": `'Oui'`,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        "10",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
    });

    const result = engine.getReferences("résultat conventionnel");

    expect(result).toHaveLength(refs.length);
    expect(result).toEqual(expect.arrayContaining(refs));
  });
});
