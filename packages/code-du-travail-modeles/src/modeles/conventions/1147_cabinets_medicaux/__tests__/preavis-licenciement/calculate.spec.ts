import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1147"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "article 25 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=B78C466DDE1AAC805D24C90B1D6C1B59.tplgfr38s_2?idArticle=KALIARTI000027745280&cidTexte=KALITEXT000005681857&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 15, unit: "jours" },
      expectedReferences: [
        {
          article: "article 25 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=B78C466DDE1AAC805D24C90B1D6C1B59.tplgfr38s_2?idArticle=KALIARTI000027745280&cidTexte=KALITEXT000005681857&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle Noncadres . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "article 25 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=B78C466DDE1AAC805D24C90B1D6C1B59.tplgfr38s_2?idArticle=KALIARTI000027745280&cidTexte=KALITEXT000005681857&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle Noncadres . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "article 25 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=B78C466DDE1AAC805D24C90B1D6C1B59.tplgfr38s_2?idArticle=KALIARTI000027745280&cidTexte=KALITEXT000005681857&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . cabinets médicaux . catégorie professionnelle Noncadres . ancienneté":
          "'Plus de 2 ans'",
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
        "contrat salarié . convention collective": "'IDCC1147'",
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
