import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "275"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 11, Annexe II",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A669A8D4959C60AC9D8FC2BCE24A3F9E.tplgfr43s_1?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 11, Annexe II",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A669A8D4959C60AC9D8FC2BCE24A3F9E.tplgfr43s_1?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 11, Annexe II",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A669A8D4959C60AC9D8FC2BCE24A3F9E.tplgfr43s_1?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Techniciens . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 11, Annexe II",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=A669A8D4959C60AC9D8FC2BCE24A3F9E.tplgfr43s_1?idArticle=KALIARTI000005872146&cidTexte=KALITEXT000005688169&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Techniciens'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Techniciens . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 10, Annexe I",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8F0A015EC69AE0F899489E29A88831C7.tplgfr27s_1?idArticle=KALIARTI000005872089&cidTexte=KALITEXT000005688165&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 15, Annexe III",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0802D655AF540CB544CBBB1A9BD8895B.tplgfr24s_1?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Ouvriers . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 15, Annexe III",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0802D655AF540CB544CBBB1A9BD8895B.tplgfr24s_1?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Ouvriers'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Ouvriers . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 15, Annexe III",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0802D655AF540CB544CBBB1A9BD8895B.tplgfr24s_1?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Employés . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 15, Annexe III",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0802D655AF540CB544CBBB1A9BD8895B.tplgfr24s_1?idArticle=KALIARTI000005872211&cidTexte=KALITEXT000005688175&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle Employés . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC0275'",
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
