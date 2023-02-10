import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2098"
);

describe("Vérification des références juridiques pour la CC 2098", () => {
  test("Licenciement pour inaptitude non professionnelle", () => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC2098'",
      "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
        "'Oui'",
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
          article: "Article 18",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005850355?idConteneur=KALICONT000005635550",
        },
        {
          article: "Article 16",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000024922383?idConteneur=KALICONT000005635550&origin=list#KALIARTI000024922383",
        },
      ])
    );
  });

  describe("Autre licenciement", () => {
    test("Autre licenciement - Non-cadres", () => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
          "'Non'",
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
            article: "Article 19",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005850366?idConteneur=KALICONT000005635550",
          },
          {
            article: "Article 16",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000024922383?idConteneur=KALICONT000005635550&origin=list#KALIARTI000024922383",
          },
        ])
      );
    });

    test("Autre licenciement - Cadres", () => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . cadres . age":
          "35",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
          "'Non'",
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
            article:
              "Article 3.1 de l’Avenant cadres Convention collective nationale du 13 août 1999",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005850668?idConteneur=KALICONT000005635550",
          },
          {
            article: "Article 16",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000024922383?idConteneur=KALICONT000005635550&origin=list#KALIARTI000024922383",
          },
        ])
      );
    });
  });
});
