import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1480"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 46",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C82F1F97F72A0703119C7E8E78BB85F7.tpdila10v_3?idArticle=KALIARTI000005786645&cidTexte=KALITEXT000005652402&dateTexte=20090818",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . journalisme . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 46",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C82F1F97F72A0703119C7E8E78BB85F7.tpdila10v_3?idArticle=KALIARTI000005786645&cidTexte=KALITEXT000005652402&dateTexte=20090818",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . journalisme . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC1480'",
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
