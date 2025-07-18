import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1501");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 8, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle Employés . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 15, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle Employés . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle Employés . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Maîtrises'",
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle Maîtrises . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Maîtrises'",
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle Maîtrises . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 8, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle Ouvriers . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0A4CDB15908BFF8D4A2E83C3B7A96545.tplgfr33s_2?idArticle=KALIARTI000005833465&cidTexte=KALITEXT000005672325&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . restauration rapide . catégorie professionnelle Ouvriers . ancienneté":
          "'6 mois et plus'",
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
        "contrat salarié . convention collective": "'IDCC1501'",

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
