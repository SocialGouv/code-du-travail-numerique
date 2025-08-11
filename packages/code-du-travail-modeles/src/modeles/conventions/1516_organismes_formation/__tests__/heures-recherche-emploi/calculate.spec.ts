import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1516"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue: "2 heures par jour travaillé",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047518146#KALIARTI000047518146",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures d'absence seront fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié les fixeront chacun leur tour. Ces heures pour recherche d'emploi peuvent être cumulées en fin de préavis, si l'employeur l'autorise par écrit.",
      ],
      situation: {
        "contrat salarié . convention collective . organismes de formation . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour travaillé",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047518146#KALIARTI000047518146",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence seront fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié les fixeront chacun leur tour. Ces heures pour recherche d'emploi peuvent être cumulées en fin de préavis, si l'employeur l'autorise par écrit.",
      ],
      situation: {
        "contrat salarié . convention collective . organismes de formation . typeRupture":
          "'Licenciement'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 7",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005775558&cidTexte=KALITEXT000005644543&dateTexte=19890701",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . organismes de formation . typeRupture":
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
