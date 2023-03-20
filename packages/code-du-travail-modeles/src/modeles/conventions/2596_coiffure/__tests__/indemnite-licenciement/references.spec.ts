import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2596"
);

describe("Vérification des références juridiques pour la CC 2511", () => {
  test.each`
    seniority
    ${2 / 12}
    ${1}
    ${24}
  `("pour un cadre avec une ancienneté de $seniority mois", ({ seniority }) => {
    engine.setSituation({
      "contrat salarié . convention collective": "'IDCC2596'",
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        seniority,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
        seniority,
      "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
        "'Cadres'",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "1000",
    });
    const result = engine.getReferences("résultat conventionnel");

    expect(result).toHaveLength(1);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          article: "Article 7.5.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018563854?idConteneur=KALICONT000018563755",
        },
      ])
    );
  });
  test.each`
    seniority
    ${1}
    ${24}
  `(
    "pour un non cadre avec une ancienneté de $seniority mois",
    ({ seniority }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Emplois techniques et de coiffeurs'",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(1);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            article: "Article 7.5.1",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018563854?idConteneur=KALICONT000018563755",
          },
        ])
      );
    }
  );
});
