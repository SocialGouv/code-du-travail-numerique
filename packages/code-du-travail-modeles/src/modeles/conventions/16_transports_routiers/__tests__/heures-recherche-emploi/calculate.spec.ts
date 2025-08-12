import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "16"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite d'un mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 27 février 1951 relatif aux employés Annexe II, article13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849509&cidTexte=KALITEXT000005678903&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transports routiers . typeRupture Licenciement . catégorie professionnelle":
          "'Employés'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite de 2 mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 30 octobre 1951 relatif aux ingénieurs et cadres - Annexe IV article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849568&cidTexte=KALITEXT000005678909&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transports routiers . typeRupture Licenciement . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article:
            "Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000045968978#KALIARTI000045968978",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu sur la base du salaire effectif du salarié et jusqu'à 12 heures d'absence au maximum.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transports routiers . typeRupture Licenciement . catégorie professionnelle":
          "'Ouvriers'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite d'un mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transports routiers . typeRupture Licenciement . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . typeRupture Licenciement . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'1 à 5'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite de 2 mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transports routiers . typeRupture Licenciement . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . typeRupture Licenciement . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'6 à 8'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite d'un mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 27 février 1951 relatif aux employés Annexe II, article13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849509&cidTexte=KALITEXT000005678903&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle":
          "'Employés'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite de 2 mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 30 octobre 1951 relatif aux ingénieurs et cadres - Annexe IV article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849568&cidTexte=KALITEXT000005678909&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "12 heures", unit: "" },
      expectedReferences: [
        {
          article:
            "Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000045968978#KALIARTI000045968978",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu sur la base du salaire effectif du salarié.",
        "Ces heures sont fixées d'un commun accord par l'employeur et le salarié. En l'absence d'accord, 6 heures sont fixées par l’employeur et 6 heures par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle Ouvriers . personnels des entreprises de transport routier de marchandises":
          "'Oui'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article:
            "Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000045968978#KALIARTI000045968978",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu sur la base du salaire effectif du salarié et jusqu'à 12 heures d'absence au maximum.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle Ouvriers . personnels des entreprises de transport routier de marchandises":
          "'Non'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite d'un mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'1 à 5'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour dans la limite de 2 mois",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . typeRupture Démission . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'6 à 8'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Accord du 30 octobre 1951 relatif aux ingénieurs et cadres - Annexe IV article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849568&cidTexte=KALITEXT000005678909&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transports routiers . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC0016'",

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
