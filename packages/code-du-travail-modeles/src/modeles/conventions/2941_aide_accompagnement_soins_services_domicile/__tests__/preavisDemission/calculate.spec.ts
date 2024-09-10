import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2941");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Titre IV, Article 27",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392523#KALIARTI000044392523",
        },
      ],
      expectedNotifications: ["de date à date"],
      situation: {
        "contrat salarié . convention collective . bad . catégorie professionnelle":
          "'Employé'",
        "contrat salarié . convention collective . bad . catégorie professionnelle Employé . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Titre IV, Article 27",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392523#KALIARTI000044392523",
        },
      ],
      expectedNotifications: ["de date à date"],
      situation: {
        "contrat salarié . convention collective . bad . catégorie professionnelle":
          "'Employé'",
        "contrat salarié . convention collective . bad . catégorie professionnelle Employé . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Titre IV, Article 27",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392523#KALIARTI000044392523",
        },
      ],
      expectedNotifications: ["de date à date"],
      situation: {
        "contrat salarié . convention collective . bad . catégorie professionnelle":
          "'Employé'",
        "contrat salarié . convention collective . bad . catégorie professionnelle Employé . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Titre IV, Article 27",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392523#KALIARTI000044392523",
        },
      ],
      expectedNotifications: ["de date à date"],
      situation: {
        "contrat salarié . convention collective . bad . catégorie professionnelle":
          "'Technicienagent de maîtrise'",
        "contrat salarié . convention collective . bad . catégorie professionnelle Technicienagent de maîtrise . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Titre IV, Article 27",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392523#KALIARTI000044392523",
        },
      ],
      expectedNotifications: ["de date à date"],
      situation: {
        "contrat salarié . convention collective . bad . catégorie professionnelle":
          "'Technicienagent de maîtrise'",
        "contrat salarié . convention collective . bad . catégorie professionnelle Technicienagent de maîtrise . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Titre IV, Article 27",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392523#KALIARTI000044392523",
        },
      ],
      expectedNotifications: ["de date à date"],
      situation: {
        "contrat salarié . convention collective . bad . catégorie professionnelle":
          "'Cadre'",
        "contrat salarié . convention collective . bad . catégorie professionnelle Cadre . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 4, unit: "mois" },
      expectedReferences: [
        {
          article: "Titre IV, Article 27",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044392523#KALIARTI000044392523",
        },
      ],
      expectedNotifications: ["de date à date"],
      situation: {
        "contrat salarié . convention collective . bad . catégorie professionnelle":
          "'Cadre'",
        "contrat salarié . convention collective . bad . catégorie professionnelle Cadre . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC2941'",

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
