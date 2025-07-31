import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "843"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois et demi" },
      expectedReferences: [
        {
          article: "Annexe : Statut du personnel d'encadrement, article 6",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=00ED481B06D16DF3872B514EAE7D831A.tplgfr25s_3?idArticle=KALIARTI000038678849&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle Cadres . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe : Statut du personnel d'encadrement, article 6",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=00ED481B06D16DF3872B514EAE7D831A.tplgfr25s_3?idArticle=KALIARTI000038678849&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=00ED481B06D16DF3872B514EAE7D831A.tplgfr25s_3?idArticle=KALIARTI000005873153&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":
          "'Personnel de fabrication, personnel de vente et personnel de services'",
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle Personnel de fabrication, personnel de vente et personnel de services . ancienneté":
          "'Moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=00ED481B06D16DF3872B514EAE7D831A.tplgfr25s_3?idArticle=KALIARTI000005873153&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":
          "'Personnel de fabrication, personnel de vente et personnel de services'",
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle Personnel de fabrication, personnel de vente et personnel de services . ancienneté":
          "'Plus de 6 mois à moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 32",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=00ED481B06D16DF3872B514EAE7D831A.tplgfr25s_3?idArticle=KALIARTI000005873153&cidTexte=KALITEXT000005688564&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle":
          "'Personnel de fabrication, personnel de vente et personnel de services'",
        "contrat salarié . convention collective . boulangerie patisserie . catégorie professionnelle Personnel de fabrication, personnel de vente et personnel de services . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC0843'",
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
