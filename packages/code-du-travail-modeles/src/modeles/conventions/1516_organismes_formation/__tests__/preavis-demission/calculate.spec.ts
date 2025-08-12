import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1516");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047518146#KALIARTI000047518146",
        },
      ],
      expectedNotifications: [
        "En cas de démission, les délais accordés peuvent être très courts si, à la suite de la demande du salarié, l'employeur estime que le départ précipité de ce dernier ne perturbe pas la bonne marche de l'entreprise. Ces délais sont à discuter au cas par cas et ne peuvent, en tout état de cause, être supérieurs à la durée des préavis fixés ci-dessus en cas de licenciement.",
      ],
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
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047518146#KALIARTI000047518146",
        },
      ],
      expectedNotifications: [
        "En cas de démission, les délais accordés peuvent être très courts si, à la suite de la demande du salarié, l'employeur estime que le départ précipité de ce dernier ne perturbe pas la bonne marche de l'entreprise. Ces délais sont à discuter au cas par cas et ne peuvent, en tout état de cause, être supérieurs à la durée des préavis fixés ci-dessus en cas de licenciement.",
      ],
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
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047518146#KALIARTI000047518146",
        },
      ],
      expectedNotifications: [
        "En cas de démission, les délais accordés peuvent être très courts si, à la suite de la demande du salarié, l'employeur estime que le départ précipité de ce dernier ne perturbe pas la bonne marche de l'entreprise. Ces délais sont à discuter au cas par cas et ne peuvent, en tout état de cause, être supérieurs à la durée des préavis fixés ci-dessus en cas de licenciement.",
      ],
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
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047518146#KALIARTI000047518146",
        },
      ],
      expectedNotifications: [
        "En cas de démission, les délais accordés peuvent être très courts si, à la suite de la demande du salarié, l'employeur estime que le départ précipité de ce dernier ne perturbe pas la bonne marche de l'entreprise. Ces délais sont à discuter au cas par cas et ne peuvent, en tout état de cause, être supérieurs à la durée des préavis fixés ci-dessus en cas de licenciement.",
      ],
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
