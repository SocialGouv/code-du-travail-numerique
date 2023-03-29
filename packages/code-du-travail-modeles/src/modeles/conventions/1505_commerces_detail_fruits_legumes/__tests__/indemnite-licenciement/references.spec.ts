import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1505"
);

describe("Vérification des références juridiques pour la CC 1505", () => {
  test("Licenciement", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC1505'",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        "10",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
        "10",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2800",
    });
    const result = engine.getReferences("résultat conventionnel");
    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          article: "Article 21",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562753?idConteneur=KALICONT000005635421&origin=list#KALIARTI000043562753",
        },
        {
          article: "Article 42.5.2",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562840?idConteneur=KALICONT000005635421&origin=list#KALIARTI0000435628400",
        },
      ])
    );
  });
});
