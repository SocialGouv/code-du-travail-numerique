import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1404"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 6.50.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=31A7E138E4F182F36A64DCE2892A88E4.tplgfr42s_2?idArticle=KALIARTI000026356072&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les cadres sont autorisés à s'absenter en une ou plusieurs fois. Les conditions des absences sont préalablement fixées par le salarié et l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . sedima . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . sedima . typeRupture Démission . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 3.41.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=80D2F05A368DC88C35B3A8F49C22BFB2.tplgfr36s_3?idArticle=KALIARTI000026356041&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures de recherche d'emploi sont réparties à raison de 2 heures par jour de travail. L'employeur fixe les conditions d'absence du salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . sedima . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . sedima . typeRupture Démission . catégorie professionnelle":
          "'Noncadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 6.50.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=31A7E138E4F182F36A64DCE2892A88E4.tplgfr42s_2?idArticle=KALIARTI000026356072&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les cadres sont autorisés à s'absenter en une ou plusieurs fois. Les conditions des absences sont préalablement fixées par le salarié et l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . sedima . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . sedima . typeRupture Licenciement . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "50 heures par mois. Pour le salarié à temps partiel, la durée de l'absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 3.41.1.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0034C396300A266584D872E127E92611.tplgfr36s_3?idArticle=KALIARTI000026356042&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié est autorisé à s'absenter pour rechercher un emploi dans la limite de 50 heures par mois réparties à raison de 2 heures par jour de travail. Ces heures d'absence peuvent être groupées en tout ou partie avec l'accord de l'employeur. Ces autorisations d'absence prennent fin dès que le salarié a retrouvé un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . sedima . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . sedima . typeRupture Licenciement . catégorie professionnelle":
          "'Noncadres'",
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
          article: "Article 3.14.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9EAC3F9CEAFEEF1886BC40B199F0D838.tplgfr28s_1?idArticle=KALIARTI000026356025&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1404'",

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
