import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1740"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800997&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Démission . durée du préavis":
          "'2 jours'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800997&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Démission . durée du préavis":
          "'2 mois'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800997&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Démission . durée du préavis":
          "'2 semaines'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800997&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Démission . durée du préavis":
          "'Un mois'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Licenciement . durée du préavis":
          "'2 jours'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Licenciement . durée du préavis":
          "'2 mois'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Licenciement . durée du préavis":
          "'2 semaines'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800996&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises groupées, en principe, à la fin du délai de préavis, sauf si l'employeur donne son accord pour une répartition différente. L'employeur ne verse pas d'indemnité, si le salarié n'utilise pas les heures pour recherche d'emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture Licenciement . durée du préavis":
          "'Un mois'",
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
          article: "Article 1.1.9a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A21177F5F79C7025761CDB35C436AE27.tplgfr37s_1?idArticle=KALIARTI000005800997&cidTexte=KALITEXT000005658612&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . ouvriers bâtiment région parisienne . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1740'",

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