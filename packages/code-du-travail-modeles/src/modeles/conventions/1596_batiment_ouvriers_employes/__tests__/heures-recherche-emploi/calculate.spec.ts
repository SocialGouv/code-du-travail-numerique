import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1596"
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=1C09253F5A9A489FD6DCD7F57C039320.tplgfr33s_1?idArticle=KALIARTI000005776856&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture Démission . durée du préavis":
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=1C09253F5A9A489FD6DCD7F57C039320.tplgfr33s_1?idArticle=KALIARTI000005776856&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture Démission . durée du préavis":
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=1C09253F5A9A489FD6DCD7F57C039320.tplgfr33s_1?idArticle=KALIARTI000005776856&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture Démission . durée du préavis":
          "'Plus de 2 semaines'",
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=1C09253F5A9A489FD6DCD7F57C039320.tplgfr33s_1?idArticle=KALIARTI000005776856&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture Licenciement . durée du préavis":
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=1C09253F5A9A489FD6DCD7F57C039320.tplgfr33s_1?idArticle=KALIARTI000005776856&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture Licenciement . durée du préavis":
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
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=1C09253F5A9A489FD6DCD7F57C039320.tplgfr33s_1?idArticle=KALIARTI000005776856&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture Licenciement . durée du préavis":
          "'Plus de 2 semaines'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 2.4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AB47E209BB157FEE63F96E0E650BBDD2.tplgfr33s_1?idArticle=KALIARTI000005776769&cidTexte=KALITEXT000005645150&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . batiment ouvriers employés . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1596'",

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
