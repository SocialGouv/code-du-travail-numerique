import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1517"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'I'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau I . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'I'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau I . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'II'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau II . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'II'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau II . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'III'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau III . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'III'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau III . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'IV'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau IV . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'IV'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau IV . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'V'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau V . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'V'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau V . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'VI'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau VI . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'VI'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau VI . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'VII'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau VII . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'VII'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau VII . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'VIII'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau VIII . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'VIII'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau VIII . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'IX'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau IX . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Chapitre VI, article 1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=36436F81C3DF558365FA1648B6380F52.tplgfr24s_1?idArticle=KALIARTI000026803725&cidTexte=KALITEXT000026803629&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau":
          "'IX'",
        "contrat salarié . convention collective . commerces de detail non alimentaires . niveau IX . ancienneté":
          "'Plus de 2 ans'",
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
        "contrat salarié . convention collective": "'IDCC1517'",
        "contrat salarié . convention collective . ancienneté légal":
          "'Moins de 6 mois'",
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
