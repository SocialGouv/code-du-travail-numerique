import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1979"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Cadres . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Cadres . ancienneté":
          "'6 mois à moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 8, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Employés . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Employés . ancienneté":
          "'6 mois à moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Employés . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 15, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Maîtrises'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Maîtrises . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Maîtrises'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Maîtrises . ancienneté":
          "'6 mois à moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Maîtrises'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Maîtrises . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC1979'",
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
