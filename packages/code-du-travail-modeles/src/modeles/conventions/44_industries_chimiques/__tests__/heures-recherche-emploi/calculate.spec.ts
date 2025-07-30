import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "44"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 2  du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846461&cidTexte=KALITEXT000005677795",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées",
        "Le salarié peut utiliser les heures après en avoir informé la direction.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Démission . catégorie professionnelle":
          "'Agents de maîtrise'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A1DB5F1F24C4E5819010CD7A35AB832F.tplgfr28s_1?idArticle=KALIARTI000005846301&cidTexte=KALITEXT000005677770&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié s'absente après accord avec la direction.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Démission . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures équivalant à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27.",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=A537E2D009FC3FF2B8E6ABC0BF24BA9E.tplgfr28s_1?idSectionTA=KALISCTA000005722247&cidTexte=KALITEXT000005677782&idConvention=KALICONT000005635613&dateTexte=29990101",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Démission . catégorie professionnelle":
          "'Ouvriers, Employés'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27.",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=A537E2D009FC3FF2B8E6ABC0BF24BA9E.tplgfr28s_1?idSectionTA=KALISCTA000005722247&cidTexte=KALITEXT000005677782&idConvention=KALICONT000005635613&dateTexte=29990101",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Démission . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Démission . catégorie professionnelle Techniciens . groupe":
          "'De I à III'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 2  du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846461&cidTexte=KALITEXT000005677795",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié peut utiliser ces heures après en avoir informé la direction.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Démission . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Démission . catégorie professionnelle Techniciens . groupe":
          "'IV'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "30 heures, si le contrat de travail est rompu après la moitié de la période d'essai",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 2  du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846423&cidTexte=KALITEXT000005677795&dateTexte=20200203",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont choisies par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Agents de maîtrise'",
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
            "Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A1DB5F1F24C4E5819010CD7A35AB832F.tplgfr28s_1?idArticle=KALIARTI000005846301&cidTexte=KALITEXT000005677770&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Ingénieurs, Cadres . ancienneté":
          "'1 mois et demi ou moins'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "30 heures, si le contrat de travail est rompu après un mois et demi",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A1DB5F1F24C4E5819010CD7A35AB832F.tplgfr28s_1?idArticle=KALIARTI000005846301&cidTexte=KALITEXT000005677770&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont choisies par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Ingénieurs, Cadres . ancienneté":
          "'Plus de 1 mois et demi'",
      },
    },
    {
      expectedResult: { expectedValue: "30 heures", unit: "" },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=4F87518AA6E6EB352BF33937E3AC257A.tplgfr28s_1?idArticle=KALIARTI000005846362&cidTexte=KALITEXT000005677782&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont choisies par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Ouvriers, Employés . durée du préavis":
          "'15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: "12 heures", unit: "" },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=4F87518AA6E6EB352BF33937E3AC257A.tplgfr28s_1?idArticle=KALIARTI000005846362&cidTexte=KALITEXT000005677782&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont choisies par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Ouvriers, Employés . durée du préavis":
          "'6 jours'",
      },
    },
    {
      expectedResult: { expectedValue: "30 heures", unit: "" },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=4F87518AA6E6EB352BF33937E3AC257A.tplgfr28s_1?idArticle=KALIARTI000005846362&cidTexte=KALITEXT000005677782&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont choisies par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Techniciens . durée du préavis":
          "'15 jours'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Techniciens . durée du préavis 15 jours . groupe":
          "'De I à III'",
      },
    },
    {
      expectedResult: { expectedValue: "30 heures", unit: "" },
      expectedReferences: [
        {
          article:
            "Avenant n° 2  du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846423&cidTexte=KALITEXT000005677795&dateTexte=20200203",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont choisies par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Techniciens . durée du préavis":
          "'15 jours'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Techniciens . durée du préavis 15 jours . groupe":
          "'IV'",
      },
    },
    {
      expectedResult: { expectedValue: "12 heures", unit: "" },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=4F87518AA6E6EB352BF33937E3AC257A.tplgfr28s_1?idArticle=KALIARTI000005846362&cidTexte=KALITEXT000005677782&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures sont choisies par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Techniciens . durée du préavis":
          "'6 jours'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Rupture de la période d'essai . catégorie professionnelle Techniciens . durée du préavis 6 jours . groupe":
          "'De I à III'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 2  du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846461&cidTexte=KALITEXT000005677795",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées",
        "Le salarié peut utiliser les heures après en avoir informé la direction.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Licenciement . catégorie professionnelle":
          "'Agents de maîtrise'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 3 du 16 juin 1955 relatif aux ingénieurs et cadres Article 4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A1DB5F1F24C4E5819010CD7A35AB832F.tplgfr28s_1?idArticle=KALIARTI000005846301&cidTexte=KALITEXT000005677770&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié s'absente après accord avec la direction.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Licenciement . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures équivalant à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27.",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=A537E2D009FC3FF2B8E6ABC0BF24BA9E.tplgfr28s_1?idSectionTA=KALISCTA000005722247&cidTexte=KALITEXT000005677782&idConvention=KALICONT000005635613&dateTexte=29990101",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Licenciement . catégorie professionnelle":
          "'Ouvriers, Employés'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 1 du 11 février 1971 relatif aux ouvriers et collaborateurs, Article 27.",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=A537E2D009FC3FF2B8E6ABC0BF24BA9E.tplgfr28s_1?idSectionTA=KALISCTA000005722247&cidTexte=KALITEXT000005677782&idConvention=KALICONT000005635613&dateTexte=29990101",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié a automatiquement droit à ces heures d'absence. Elles seront fixées un jour par le salarié et un jour par l'employeur. Si l'employeur et le salarié trouvent un accord, ces heures pourront être groupées en partie ou en totalité.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Licenciement . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Licenciement . catégorie professionnelle Techniciens . groupe":
          "'De I à III'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire du travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article:
            "Avenant n° 2  du 14 mars 1955,relatif aux agents de maîtrise et techniciens, article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846461&cidTexte=KALITEXT000005677795",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu. Les heures non utilisées ne seront pas payées.",
        "Le salarié peut utiliser ces heures après en avoir informé la direction.",
      ],
      situation: {
        "contrat salarié . convention collective . industries chimiques . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Licenciement . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . typeRupture Licenciement . catégorie professionnelle Techniciens . groupe":
          "'IV'",
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
        "contrat salarié . convention collective": "'IDCC0044'",

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
