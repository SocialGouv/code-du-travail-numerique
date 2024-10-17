import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "86"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 49",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023734748&cidTexte=KALITEXT000005682357&dateTexte=20191022",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857360&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857304&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . publicité française . catégorie professionnelle Employés . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857304&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . publicité française . catégorie professionnelle Employés . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC0086'",
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
