import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1527");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'Moins de 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'Au moins 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Cadres nonVRP'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Cadres VRP'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Cadres VRP . ancienneté":
          "'Moins de 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Cadres VRP'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Cadres VRP . ancienneté":
          "'Au moins 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Négociateur non VRP'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Négociateur non VRP . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Négociateur non VRP'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Négociateur non VRP . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Négociateur VRP'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Négociateur VRP . ancienneté":
          "'Moins de 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Négociateur VRP'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Négociateur VRP . ancienneté":
          "'1 an à moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Négociateur VRP'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Négociateur VRP . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Ouvriers, Employés . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=D26C8B281BBEBC7C9D780865323DB02D.tplgfr27s_1?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . immobilier . catégorie professionnelle Ouvriers, Employés . ancienneté":
          "'2 ans ou plus'",
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
        "contrat salarié . convention collective": "'IDCC1527'",

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