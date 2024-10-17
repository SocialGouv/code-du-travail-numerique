import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "3043");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 0 },
      expectedReferences: [
        {
          article: "Article 4.11.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Agents de propreté'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Agents de propreté . ancienneté":
          "'Moins de 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 4.11.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Agents de propreté'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Agents de propreté . ancienneté":
          "'1 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 4.11.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Agents de propreté'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Agents de propreté . ancienneté":
          "'Plus de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Employés'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Techniciens et agents de maîtrise TAM . ancienneté":
          "'2 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Techniciens et agents de maîtrise TAM . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC3043'",

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
