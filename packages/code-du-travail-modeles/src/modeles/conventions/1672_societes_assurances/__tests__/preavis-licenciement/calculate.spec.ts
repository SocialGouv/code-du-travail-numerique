import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1672"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article:
            'Accord relative aux dispositions particulières " Cadres ", article II. 6',
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=3586CF13469976784B743EB6B765BDF5.tplgfr44s_1?idArticle=KALIARTI000026688804&cidTexte=KALITEXT000005654666&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Cadres . classe":
          "'5'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article:
            'Accord relative aux dispositions particulières " Cadres ", article II. 6',
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=3586CF13469976784B743EB6B765BDF5.tplgfr44s_1?idArticle=KALIARTI000026688804&cidTexte=KALITEXT000005654666&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Cadres . classe":
          "'6'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article:
            'Accord relative aux dispositions particulières " Cadres ", article II. 6',
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=3586CF13469976784B743EB6B765BDF5.tplgfr44s_1?idArticle=KALIARTI000026688804&cidTexte=KALITEXT000005654666&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Cadres . classe":
          "'7'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'1'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 1 . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'1'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 1 . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'2'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 2 . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'2'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 2 . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'3'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 3 . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'3'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 3 . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'4'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 4 . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 91a",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=C5B58FC26FD1460117AC96E23B92112B.tplgfr30s_2?idArticle=KALIARTI000005792102&cidTexte=KALITEXT000005654646&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe":
          "'4'",
        "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle Noncadres . classe 4 . ancienneté":
          "'2 ans ou plus'",
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
        "contrat salarié . convention collective": "'IDCC1672'",
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
