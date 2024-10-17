import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "3127"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Article 1. 1 de la section 1 du Chapitre 4 de la Partie II de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E154C093E99FDBC15E7328F16C01CDA4.tplgfr37s_1?idArticle=KALIARTI000027034201&cidTexte=KALITEXT000026943196&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de services à la personne . ancienneté":
          "'6 mois à moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Article 1. 1 de la section 1 du Chapitre 4 de la Partie II de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E154C093E99FDBC15E7328F16C01CDA4.tplgfr37s_1?idArticle=KALIARTI000027034201&cidTexte=KALITEXT000026943196&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de services à la personne . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC3127'",
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
