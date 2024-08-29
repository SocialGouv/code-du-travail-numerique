import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "16"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Employés . ancienneté":
          "'Moins de 1 mois'",
      },
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe II, article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849509&cidTexte=KALITEXT000005678903&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Employés . ancienneté":
          "'1 mois à moins de 2 ans'",
      },
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe II, article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849509&cidTexte=KALITEXT000005678903&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Employés . ancienneté":
          "'2 ans ou plus'",
      },
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe II, article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849509&cidTexte=KALITEXT000005678903&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ingénieurs et Cadres'",
      },
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe IV, Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849568&cidTexte=KALITEXT000005678909&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . ancienneté":
          "'Moins de 6 mois'",
      },
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe I, chapitre Ier, article 5",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849372&cidTexte=KALITEXT000005678895&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . ancienneté":
          "'6 mois à 2 ans'",
      },
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe I, chapitre Ier, article 5",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849372&cidTexte=KALITEXT000005678895&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Ouvriers . ancienneté":
          "'2 ans ou plus'",
      },
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe I, chapitre Ier, article 5",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849372&cidTexte=KALITEXT000005678895&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'1 à 5'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe 1 à 5 . ancienneté":
          "'Moins de 1 mois'",
      },
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe III, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'1 à 5'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe 1 à 5 . ancienneté":
          "'1 mois à moins de 2 ans'",
      },
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe III, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'1 à 5'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe 1 à 5 . ancienneté":
          "'2 ans ou plus'",
      },
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe III, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
    {
      situation: {
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . transports routiers . catégorie professionnelle Techniciens et agents de maîtrise TAM . groupe":
          "'6 à 8'",
      },
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe III, article 17",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9D32D1AB24BC5ACF016410CDFEE667F3.tplgfr24s_3?idArticle=KALIARTI000005849262&cidTexte=KALITEXT000005678889&dateTexte=29990101&categorieLien=id",
        },
      ],
    },
  ])(
    "Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({ situation, expectedResult, expectedReferences }) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0016'",
        "contrat salarié . convention collective . ancienneté légal":
          "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(
        expectedResult.expectedValue,
        expectedResult.unit
      );
      expect(result).toHaveReferencesBeEqual(expectedReferences);
    }
  );
});
