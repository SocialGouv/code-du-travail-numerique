import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1702"
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
          article: "Article 10.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8A4EAD9E444A1F60CAB37AB20B96CFF4.tplgfr36s_2?idArticle=KALIARTI000005801847&cidTexte=KALITEXT000005658951&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture Démission . durée du préavis":
          "'2 jours'",
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
          article: "Article 10.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8A4EAD9E444A1F60CAB37AB20B96CFF4.tplgfr36s_2?idArticle=KALIARTI000005801847&cidTexte=KALITEXT000005658951&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture Démission . durée du préavis":
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
          article: "Article 10.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8A4EAD9E444A1F60CAB37AB20B96CFF4.tplgfr36s_2?idArticle=KALIARTI000005801847&cidTexte=KALITEXT000005658951&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture Démission . durée du préavis":
          "'Un mois et plus'",
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
          article: "Article 10.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8A4EAD9E444A1F60CAB37AB20B96CFF4.tplgfr36s_2?idArticle=KALIARTI000005801847&cidTexte=KALITEXT000005658951&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis. Aucune indemnité n'est due par l'employeur si les heures pour recherche d'emploi ne sont pas utilisées par l'ouvrier.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture Licenciement . durée du préavis":
          "'2 jours'",
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
          article: "Article 10.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8A4EAD9E444A1F60CAB37AB20B96CFF4.tplgfr36s_2?idArticle=KALIARTI000005801847&cidTexte=KALITEXT000005658951&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis. Aucune indemnité n'est due par l'employeur si les heures pour recherche d'emploi ne sont pas utilisées par l'ouvrier.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture Licenciement . durée du préavis":
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
          article: "Article 10.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8A4EAD9E444A1F60CAB37AB20B96CFF4.tplgfr36s_2?idArticle=KALIARTI000005801847&cidTexte=KALITEXT000005658951&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures pour rechercher un nouvel emploi sont prises, en principe, par demi-journées ou groupées à la fin du délai de préavis. Aucune indemnité n'est due par l'employeur si les heures pour recherche d'emploi ne sont pas utilisées par l'ouvrier.",
      ],
      situation: {
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture Licenciement . durée du préavis":
          "'Un mois et plus'",
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
          article: "Article 10.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8A4EAD9E444A1F60CAB37AB20B96CFF4.tplgfr36s_2?idArticle=KALIARTI000005801847&cidTexte=KALITEXT000005658951&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . ouvriers travaux public . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1702'",

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
