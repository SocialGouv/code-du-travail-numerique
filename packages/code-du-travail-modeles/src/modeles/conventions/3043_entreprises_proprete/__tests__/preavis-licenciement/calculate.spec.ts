import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "3043"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 0 },
      expectedReferences: [
        {
          article: "Article 4.11.2",
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
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 4.11.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Agents de propreté'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Agents de propreté . ancienneté":
          "'1 mois à moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Agents de propreté'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Agents de propreté . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Agents de propreté'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Agents de propreté . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2",
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
      expectedResult: { expectedValue: 0 },
      expectedReferences: [
        {
          article: "Article 4.11.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Employés . ancienneté":
          "'Moins de 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Employés . ancienneté":
          "'1 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000027172424&cidTexte=KALITEXT000027172340",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . entreprises de propreté . catégorie professionnelle Employés . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.11.2",
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
          article: "Article 4.11.2",
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
