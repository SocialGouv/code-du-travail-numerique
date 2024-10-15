import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1527"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées à tour de rôle par l'employeur et le salarié. L'employeur peut autoriser par écrit le salarié à cumuler ses heures pour recherche d'emploi en fin de période de préavis, si les nécessités du service le permettent.",
      ],
      situation: {
        "contrat salarié . convention collective . immobilier . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759231&cidTexte=KALITEXT000023759095",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées à tour de rôle par l'employeur et le salarié. L'employeur peut autoriser par écrit le salarié à cumuler ses heures pour recherche d'emploi en fin de période de préavis, si les nécessités du service le permettent.",
      ],
      situation: {
        "contrat salarié . convention collective . immobilier . typeRupture":
          "'Licenciement'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000023759150&cidTexte=KALITEXT000023759095&dateTexte=20200206",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . immobilier . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1527'",

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
