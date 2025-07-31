import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "2148"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . télécommunications . groupe":
          "'A et B'",
        "contrat salarié . convention collective . télécommunications . groupe A et B . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . télécommunications . groupe":
          "'A et B'",
        "contrat salarié . convention collective . télécommunications . groupe A et B . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . télécommunications . groupe":
          "'C et D'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . télécommunications . groupe":
          "'E, F et G'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.4.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Consultez votre contrat de travail pour connaître la durée exacte du préavis de licenciement applicable. Cette durée ne peut être inférieure à 3 mois.",
      ],
      situation: {
        "contrat salarié . convention collective . télécommunications . groupe":
          "'Hors classification'",
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
        "contrat salarié . convention collective": "'IDCC2148'",
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
