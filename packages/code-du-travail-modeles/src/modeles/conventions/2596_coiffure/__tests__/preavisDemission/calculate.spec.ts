import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2596");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Agents de maîtrise'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Salariés occupant un emploi de l'esthétiquecosmétique'",
        "contrat salarié . convention collective . coiffure . catégorie professionnelle Salariés occupant un emploi de l'esthétiquecosmétique . ancienneté":
          "'6 mois ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Salariés occupant un emploi de l'esthétiquecosmétique'",
        "contrat salarié . convention collective . coiffure . catégorie professionnelle Salariés occupant un emploi de l'esthétiquecosmétique . ancienneté":
          "'Plus de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Salariés occupant un emploi nontechnique de la coiffure'",
        "contrat salarié . convention collective . coiffure . catégorie professionnelle Salariés occupant un emploi nontechnique de la coiffure . ancienneté":
          "'6 mois ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Salariés occupant un emploi nontechnique de la coiffure'",
        "contrat salarié . convention collective . coiffure . catégorie professionnelle Salariés occupant un emploi nontechnique de la coiffure . ancienneté":
          "'Plus de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Salariés occupant un emploi technique de la coiffure'",
        "contrat salarié . convention collective . coiffure . catégorie professionnelle Salariés occupant un emploi technique de la coiffure . ancienneté":
          "'6 mois ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 7.4.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000018563843&cidTexte=KALITEXT000018563760",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . coiffure . catégorie professionnelle":
          "'Salariés occupant un emploi technique de la coiffure'",
        "contrat salarié . convention collective . coiffure . catégorie professionnelle Salariés occupant un emploi technique de la coiffure . ancienneté":
          "'Plus de 6 mois'",
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
        "contrat salarié . convention collective": "'IDCC2596'",

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