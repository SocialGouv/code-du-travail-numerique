import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2264");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 45",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801971&cidTexte=KALITEXT000005658770&dateTexte=20191017",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 45",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801971&cidTexte=KALITEXT000005658770&dateTexte=20191017",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle":
          "'Cadres dirigeants'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 45",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801971&cidTexte=KALITEXT000005658770&dateTexte=20191017",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle":
          "'Cadres supérieurs'",
      },
    },
    {
      expectedResult: { expectedValue: 5, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 45",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801971&cidTexte=KALITEXT000005658770&dateTexte=20191017",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle Employés . ancienneté":
          "'6 mois ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 45",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801971&cidTexte=KALITEXT000005658770&dateTexte=20191017",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle Employés . ancienneté":
          "'Plus de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 45",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801971&cidTexte=KALITEXT000005658770&dateTexte=20191017",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle Techniciens et agents de maîtrise TAM . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 45",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801971&cidTexte=KALITEXT000005658770&dateTexte=20191017",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . hospitalisation privées . catégorie professionnelle Techniciens et agents de maîtrise TAM . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC2264'",

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
