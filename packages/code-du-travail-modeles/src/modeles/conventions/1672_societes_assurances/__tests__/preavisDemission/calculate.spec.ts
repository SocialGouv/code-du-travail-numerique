import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1672");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article:
            'Article II. 6 de l\'accord relatif aux dispositions particulières " Cadres "',
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=B48AED9DB5F1742E99768AF572DBFEF2.tpdjo13v_1?idSectionTA=KALISCTA000026688794&cidTexte=KALITEXT000005654666&idConvention=KALICONT000005635918",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Cadres Classes 5 à 7'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91 a) de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=E0FA42F1D98C3A5E305111F72B4DD513.tpdjo06v_1?idSectionTA=KALISCTA000005765066&cidTexte=KALITEXT000005654646&idConvention=KALICONT000005635918",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Noncadres Classes 1 à 4'",
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
        "contrat salarié . convention collective": "'IDCC1672'",

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
