import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1516"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000047518146/?idConteneur=KALICONT000005635435",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000047518146/?idConteneur=KALICONT000005635435",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle Employés . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000047518146/?idConteneur=KALICONT000005635435",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle Employés . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000047518146/?idConteneur=KALICONT000005635435",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Agents de maîtrise ou techniciens'",
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
        "contrat salarié . convention collective": "'IDCC1516'",
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
