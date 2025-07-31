import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "3239"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 162.4.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942452?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942452",
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
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 162.4.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942452?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942452",
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
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 162.4.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942452?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942452",
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
      expectedResult: { expectedValue: 8, unit: "jours calendaires" },
      expectedReferences: [
        {
          article: "Art. L. 423-25 du Code de l'action sociale et des familles",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006798053",
        },
        {
          article: "Art. 120 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942318?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942318",
        },
      ],
      expectedNotifications: [
        'Si la lettre de licenciement a été présentée avant le 01/01/2022, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2021 c’est la convention collective “Assistants maternels du particulier employeur (IDCC 2395)” qui s’appliquait. Celle-ci a fusionné avec la convention collective "Salariés du particulier employeur (IDCC 2111)" pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable depuis le 01/01/2022.',
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
          article: "Art. L. 423-25 du Code de l'action sociale et des familles",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006798053",
        },
        {
          article: "Art. 120 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942318?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942318",
        },
      ],
      expectedNotifications: [
        'Si la lettre de licenciement a été présentée avant le 01/01/2022, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2021 c’est la convention collective “Assistants maternels du particulier employeur (IDCC 2395)” qui s’appliquait. Celle-ci a fusionné avec la convention collective "Salariés du particulier employeur (IDCC 2111)" pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable depuis le 01/01/2022.',
      ],
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
          article: "Art. L. 423-25 du Code de l'action sociale et des familles",
          url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006798053",
        },
        {
          article: "Art. 120 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043942318?idConteneur=KALICONT000044594539&origin=list#KALIARTI000043942318",
        },
      ],
      expectedNotifications: [
        'Si la lettre de licenciement a été présentée avant le 01/01/2022, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2021 c’est la convention collective “Assistants maternels du particulier employeur (IDCC 2395)” qui s’appliquait. Celle-ci a fusionné avec la convention collective "Salariés du particulier employeur (IDCC 2111)" pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable depuis le 01/01/2022.',
      ],
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
