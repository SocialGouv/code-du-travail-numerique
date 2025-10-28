import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1672");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article:
            'Article II. 6 de l\'accord relatif aux dispositions particulières " Cadres "',
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026688804#KALIARTI000026688804",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Cadres (Classes 5 à 7)'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91 a) de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792102#KALIARTI000005792102",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres (Classes 1 à 4)'",
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
