import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1518");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Agents de maîtrise et Techniciens . groupe":
          "'4'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Agents de maîtrise et Techniciens . groupe":
          "'5'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Agents de maîtrise et Techniciens . groupe":
          "'6'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Animateurs, techniciens et professeurs'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Animateurs, techniciens et professeurs . niveau":
          "'A'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Animateurs, techniciens et professeurs'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Animateurs, techniciens et professeurs . niveau":
          "'B'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Cadres . groupe":
          "'7'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Cadres . groupe":
          "'8'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Ouvriers, Employés . groupe":
          "'2'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . éducation et loisirs . catégorie professionnelle Ouvriers, Employés . groupe":
          "'3'",
      },
    },
  ])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({
      situation,
      expectedResult,
      expectedReferences,
      expectedNotifications,
    }) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1518'",

        ...situation,
      });
      expect(result).toResultBeEqual(
        expectedResult.expectedValue,
        expectedResult.unit
      );
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
    }
  );
});
