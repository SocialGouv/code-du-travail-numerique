import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1527"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
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
        "contrat salarié . convention collective . ancienneté légal":
          "'Moins de 6 mois'",
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
