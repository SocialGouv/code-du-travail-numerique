import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1090"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865234&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Agents de maîtrise . échelon":
          "'De 17 à 19'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865234&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Agents de maîtrise . échelon":
          "'De 20 à 25'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865234&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon":
          "'1 et 2'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon 1 et 2 . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon":
          "'1 et 2'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon 1 et 2 . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon":
          "'1 et 2'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon 1 et 2 . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon":
          "'De 3 à 12'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon De 3 à 12 . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon":
          "'De 3 à 12'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle Ouvriers, Employés . échelon De 3 à 12 . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC1090'",
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
