import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "275"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 2 Article 11",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Licenciement . catégorie professionnelle":
          "'Agents de maîtrise'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 2 Article 11",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Licenciement . catégorie professionnelle":
          "'Techniciens'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Annexe 1, Article 10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872089&cidTexte=KALITEXT000005688165&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absences peuvent être prises en une ou plusieurs fois en accord avec l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Licenciement . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 3, Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Licenciement . catégorie professionnelle":
          "'Employés'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 3, Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Licenciement . catégorie professionnelle":
          "'Ouvriers'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 2 Article 11",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Démission . catégorie professionnelle":
          "'Agents de maîtrise'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 2 Article 11",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Démission . catégorie professionnelle":
          "'Techniciens'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Annexe 1, Article 10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872089&cidTexte=KALITEXT000005688165&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absences peuvent être prises en une ou plusieurs fois en accord avec l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Démission . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 3, Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Démission . catégorie professionnelle":
          "'Ouvriers'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite de 50 heures au total",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe 3, Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5A3C02D1A1763C39E0F1713E1FCDCBD.tplgfr24s_2?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture Démission . catégorie professionnelle":
          "'Employés'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
        unit: "",
      },
      expectedReferences: [],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC0275'",

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