import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "86"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 48",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857333&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . publicité française . typeRupture Démission . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 67",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857359&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . publicité française . typeRupture Démission . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 29",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857303&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . publicité française . typeRupture Démission . catégorie professionnelle":
          "'Employés'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 49",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0CDA73A706A07B27D229606239EC6628.tplgfr24s_2?idArticle=KALIARTI000023734748&cidTexte=KALITEXT000005682357&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . publicité française . typeRupture Licenciement . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857360&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . publicité française . typeRupture Licenciement . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 30",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857304&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . publicité française . typeRupture Licenciement . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . publicité française . typeRupture Licenciement . catégorie professionnelle Employés . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 30",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005857304&cidTexte=KALITEXT000005682357&dateTexte=19740607",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . publicité française . typeRupture Licenciement . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . publicité française . typeRupture Licenciement . catégorie professionnelle Employés . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "1 heure par jour lorsque l'employeur décide de la rupture du contrat après le renouvellement de la période d'essai",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 33",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022438635#KALIARTI000022438635",
        },
      ],
      expectedNotifications: [
        "",
        "L'employeur et le salarié peuvent décider de cumuler ces heures sur 1 semaine ou sur 1 mois. Ce cumul sera appliqué pour les salariés en forfait jours.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle Agents de maîtrise et Techniciens . initiative de la rupture de la période d'essai":
          "'L'employeur'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 33",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022438635#KALIARTI000022438635",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle Agents de maîtrise et Techniciens . initiative de la rupture de la période d'essai":
          "'Le salarié'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "1 heure par jour, lorsque l'employeur décide de la rupture du contrat après le renouvellement de la période d'essai",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 53",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022438638#KALIARTI000022438638",
        },
      ],
      expectedNotifications: [
        "",
        "L'employeur et le salarié peuvent décider ensemble de cumuler ces heures sur 1 semaine ou sur 1 mois. Ce cumul sera appliqué pour les salariés en forfait jours.",
      ],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle Cadres . initiative de la rupture de la période d'essai":
          "'L'employeur'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 53",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022438638#KALIARTI000022438638",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle Cadres . initiative de la rupture de la période d'essai":
          "'Le salarié'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=68C4D11B1B434910FCC8731A925B638E.tplgfr28s_1?idArticle=KALIARTI000022438632&cidTexte=KALITEXT000005682357&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . publicité française . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . publicité française . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Employés'",
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
        "contrat salarié . convention collective": "'IDCC0086'",

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
