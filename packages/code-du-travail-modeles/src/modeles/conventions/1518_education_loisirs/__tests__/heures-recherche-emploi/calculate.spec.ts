import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1518"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044530995#KALIARTI000044530995",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures peuvent être cumulées en fin de préavis après accord entre le salarié et l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps complet . ancienneté":
          "'Moins de 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044530995#KALIARTI000044530995",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures peuvent être cumulées en fin de préavis après accord entre le salarié et l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps complet . ancienneté":
          "'Plus de 1 an'",
      },
    },
    {
      expectedResult: {
        expectedValue: "25 % de la durée quotidienne de travail par jour",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044530995#KALIARTI000044530995",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Le salarié peut cumuler ces heures d'absence en fin de préavis sans obtenir l'accord de l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps partiel'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps partiel . ancienneté":
          "'Moins de 1 an'",
      },
    },
    {
      expectedResult: {
        expectedValue: "25 % de la durée quotidienne de travail par jour",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044530995#KALIARTI000044530995",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut cumuler ces heures d'absence en fin de préavis sans obtenir l'accord de l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps partiel'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps partiel . ancienneté":
          "'Plus de 1 an'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044530995#KALIARTI000044530995",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044530995#KALIARTI000044530995",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Rupture de la période d'essai'",
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
        "contrat salarié . convention collective": "'IDCC1518'",

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
