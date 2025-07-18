import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1979");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 15, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
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
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 8, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
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
      expectedResult: { expectedValue: 15, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . hotels cafes restaurants . catégorie professionnelle Employés . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 30 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DD88109D2F553DCDAAF4B80768DD7546.tplgfr25s_1?idArticle=KALIARTI000005826296&cidTexte=KALITEXT000005670044&dateTexte=29990101&categorieLien=id",
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
