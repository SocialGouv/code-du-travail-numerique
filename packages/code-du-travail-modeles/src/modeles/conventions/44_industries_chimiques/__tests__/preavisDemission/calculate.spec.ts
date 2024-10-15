import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "44");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Avenant 2, article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9658082762B1C494A3C7AB50DDDEB53B.tpdjo14v_2?idArticle=KALIARTI000005846461&cidTexte=KALITEXT000005677795&dateTexte=20120612",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Agents de maîtrise et Techniciens . coefficient":
          "'Inférieur à 275'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Avenant 2, article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9658082762B1C494A3C7AB50DDDEB53B.tpdjo14v_2?idArticle=KALIARTI000005846461&cidTexte=KALITEXT000005677795&dateTexte=20120612",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Agents de maîtrise et Techniciens . coefficient":
          "'Supérieur à 275 inclus'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Avenant n°3 article 4",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846301&cidTexte=KALITEXT000005677770&dateTexte=20190829",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 5, unit: "jours" },
      expectedReferences: [
        {
          article: "Avenant n°1 article 27",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846394&cidTexte=KALITEXT000005677782&dateTexte=20190829",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle":
          "'Ouvriers et collaborateurs'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers et collaborateurs . coefficient":
          "'Inférieur à 160'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Avenant n°1 article 27",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846394&cidTexte=KALITEXT000005677782&dateTexte=20190829",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle":
          "'Ouvriers et collaborateurs'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers et collaborateurs . coefficient":
          "'Entre 160 inclus et 175'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Avenant n°1 article 27",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005846394&cidTexte=KALITEXT000005677782&dateTexte=20190829",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle":
          "'Ouvriers et collaborateurs'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers et collaborateurs . coefficient":
          "'190 et plus'",
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
        "contrat salarié . convention collective": "'IDCC0044'",

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
