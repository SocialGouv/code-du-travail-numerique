import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "3127");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Article 2 de la section 1 du Chapitre 4 de la Partie II de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=3429E84F009E9522894D791FC4F0085E.tplgfr25s_1?idSectionTA=KALISCTA000027029046&cidTexte=KALITEXT000026943196&idConvention=KALICONT000027084096&dateTexte=29990101",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de services à la personne . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Article 2 de la section 1 du Chapitre 4 de la Partie II de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=3429E84F009E9522894D791FC4F0085E.tplgfr25s_1?idSectionTA=KALISCTA000027029046&cidTexte=KALITEXT000026943196&idConvention=KALICONT000027084096&dateTexte=29990101",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . entreprises de services à la personne . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC3127'",

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
