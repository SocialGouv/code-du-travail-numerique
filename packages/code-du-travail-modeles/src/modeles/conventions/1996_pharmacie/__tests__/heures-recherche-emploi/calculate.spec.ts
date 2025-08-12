import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1996"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite d'un tiers du temps de travail pour un salarié à temps partiel",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041761335#KALIARTI000041761335",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande.",
      ],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
          "'Démission ou licenciement'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle Cadres . durée du travail":
          "'Temps partiel'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041761335#KALIARTI000041761335",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande.",
      ],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
          "'Démission ou licenciement'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle Cadres . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041761335#KALIARTI000041761335",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande",
      ],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
          "'Démission ou licenciement'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle Noncadres . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 19",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041761375#KALIARTI000041761375",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1996'",

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
