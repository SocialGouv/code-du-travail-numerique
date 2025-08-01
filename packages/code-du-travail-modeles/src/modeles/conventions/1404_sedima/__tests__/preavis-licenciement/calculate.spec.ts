import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1404"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 6-50",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idSectionTA=KALISCTA000026355935&cidTexte=KALITEXT000026355879&idConvention=KALICONT000005635653&dateTexte=29990101",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Cadres . niveau":
          "'VII et plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau":
          "'I'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau I . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau":
          "'I'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau I . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau":
          "'II'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau II . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau":
          "'II'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau II . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Ouvriers, Employés . niveau":
          "'III'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Techniciens et agents de maîtrise TAM . niveau":
          "'IV'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Techniciens et agents de maîtrise TAM . niveau":
          "'V'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3-41-0",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E3E2CB82609A11A3A91CD84710E32F3C.tplgfr42s_2?idArticle=KALIARTI000026356039&cidTexte=KALITEXT000026355879&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . sedima . catégorie professionnelle":
          "'Techniciens et agents de maîtrise TAM'",
        "contrat salarié . convention collective . sedima . catégorie professionnelle Techniciens et agents de maîtrise TAM . niveau":
          "'VI'",
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
        "contrat salarié . convention collective": "'IDCC1404'",
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
