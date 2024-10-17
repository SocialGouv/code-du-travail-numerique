import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1404");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3.41.0 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AA399426F344A1C9D191D4546FE00E59.tplgfr41s_1?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Agents de maîtrise niveau IV et V'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 6.50 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AA399426F344A1C9D191D4546FE00E59.tplgfr41s_1?idArticle=KALIARTI000026356071&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Cadres niveau VI et plus'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3.41.0 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AA399426F344A1C9D191D4546FE00E59.tplgfr41s_1?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Ouvriers, Employés niveau III'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés niveau III . niveau":
          "'III'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3.41.0 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AA399426F344A1C9D191D4546FE00E59.tplgfr41s_1?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Ouvriers, Employés niveaux I et II'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés niveaux I et II . niveau":
          "'I à II'",
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
        "contrat salarié . convention collective": "'IDCC1404'",

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
