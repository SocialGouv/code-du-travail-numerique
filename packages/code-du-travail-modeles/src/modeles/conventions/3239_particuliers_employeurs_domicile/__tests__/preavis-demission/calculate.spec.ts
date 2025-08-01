import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "3239");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 162-6 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942455#KALIARTI000043942455",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Salariés du particulier employeur . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Article 162-6 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942455#KALIARTI000043942455",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Salariés du particulier employeur . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 162-6 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942455#KALIARTI000043942455",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Salariés du particulier employeur . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Art. L. 423-26 du Code de l'action sociale et des familles",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006798054",
        },
        {
          article: "Art. 120 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942318?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942318",
        },
      ],
      expectedNotifications: [
        "Il s’agit de la durée la plus favorable entre celle prévue par le Code de l'action sociale et des familles et celle prévue par la convention collective.",
      ],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":
          "'Assistants maternels du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Assistants maternels du particulier employeur . ancienneté":
          "'Enfant accueilli depuis moins de 3 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 15, unit: "jours calendaires" },
      expectedReferences: [
        {
          article: "Art. L. 423-26 du Code de l'action sociale et des familles",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006798054",
        },
        {
          article: "Art. 120 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942318?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942318",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":
          "'Assistants maternels du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Assistants maternels du particulier employeur . ancienneté":
          "'Enfant accueilli de 3 mois à moins d'un an'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Art. L. 423-26 du Code de l'action sociale et des familles",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006798054",
        },
        {
          article: "Art. 120 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942318?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942318",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle":
          "'Assistants maternels du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . catégorie professionnelle Assistants maternels du particulier employeur . ancienneté":
          "'Enfant accueilli depuis 1 an et plus'",
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
        "contrat salarié . convention collective": "'IDCC3239'",

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
