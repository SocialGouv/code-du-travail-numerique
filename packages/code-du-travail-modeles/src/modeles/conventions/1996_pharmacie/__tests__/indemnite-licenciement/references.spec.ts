import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1996"
);

describe("Vérification des références juridiques pour la CC 1996", () => {
  test.each`
    seniority | licenciementEco
    ${5}      | ${"'Non'"}
    ${5}      | ${"'Oui'"}
    ${12}     | ${"'Non'"}
    ${12}     | ${"'Oui'"}
    ${24}     | ${"'Non'"}
    ${24}     | ${"'Oui'"}
  `(
    "pour un cadre avec une ancienneté de $seniority mois, licenciement éco: $licenciementEco",
    ({ seniority, licenciementEco }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1996'",
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question":
          licenciementEco,
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Cadres'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            article: "Article 6 de l'Annexe Cadres",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041761357?idConteneur=KALICONT000005635528&origin=list#KALIARTI0000417613577",
          },
          {
            article: "Article 11",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106382?idConteneur=KALICONT000005635528&origin=list#KALIARTI000038106382",
          },
        ])
      );
    }
  );

  test.each`
    seniority
    ${5}
    ${12}
    ${24}
  `(
    "pour un non cadre avec une ancienneté de $seniority mois",
    ({ seniority }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1996'",
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Non-cadres'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            article: "Article 21",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106393?idConteneur=KALICONT000005635528",
          },
          {
            article: "Article 11",
            url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106382?idConteneur=KALICONT000005635528&origin=list#KALIARTI000038106382",
          },
        ])
      );
    }
  );
});
