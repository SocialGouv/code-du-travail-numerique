import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "16");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe II, article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849509&cidTexte=KALITEXT000005678903&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Employés'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe IV, Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849568&cidTexte=KALITEXT000005678909&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Sous réserve de durées plus longues prévues dans le contrat de travail",
        "Les ingénieurs et cadres pourront quitter leur emploi après 2 mois de préavis sous réserve d'en avoir informé l'employeur au moins 15 jours à l'avance. Dans ce cas, ils n'auront droit, indépendamment de l'indemnité éventuelle de congédiement, qu'à la rémunération correspondant à leur temps effectif de travail.",
      ],
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ingénieurs et Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Accord du 18 avril 2002, article 30",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=00D98259FC73011DA835156FEF965FBD.tplgfr24s_3?idArticle=KALIARTI000005850203&cidTexte=KALITEXT000005679055&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . personnel de conduite":
          "'Oui'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe I, chapitre Ier, article 5",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849372&cidTexte=KALITEXT000005678895&dateTexte=29990101&categorieLien=id",
        },
        {
          article: "Accord du 3 février 2022, article 3",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000045953114#KALIARTI000045953114",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . personnel de conduite":
          "'Non'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . personnel de conduite Non . personnels des entreprises de transport routier de marchandises":
          "'Oui'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe I, chapitre Ier, article 5",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849372&cidTexte=KALITEXT000005678895&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . personnel de conduite":
          "'Non'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . personnel de conduite Non . personnels des entreprises de transport routier de marchandises":
          "'Non'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe III, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'1 à 5'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe III, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'6 à 8'",
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
