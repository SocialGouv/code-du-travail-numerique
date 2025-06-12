import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1043");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 8, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 14",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . gardien concierge . logement":
          "'Non-logé'",
        "contrat salarié . convention collective . gardien concierge . logement . Non-logé . coefficient":
          "'Inférieur ou égal à 602'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 14",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . gardien concierge . logement":
          "'Non-logé'",
        "contrat salarié . convention collective . gardien concierge . logement . Non-logé . coefficient":
          "'Supérieur à 602'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 14",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . gardien concierge . logement":
          "'Logé'",
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
        "contrat salarié . convention collective": "'IDCC1043'",

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

  describe("Tests de vérification du bug corrigé (valeur: oui manquante)", () => {
    it("doit retourner une erreur si aucun logement n'est fourni", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1043'",
      });

      expect(result).toNextMissingQuestionBeEqual("Le salarié est-il logé ?");
    });

    it("doit retourner une erreur si le coefficient n'est pas fourni pour Non-logé", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1043'",
        "contrat salarié . convention collective . gardien concierge . logement":
          "'Non-logé'",
      });

      expect(result).toNextMissingQuestionBeEqual(
        "Quel est le coefficient hiérarchique du salarié ?"
      );
    });

    it("doit calculer correctement sans demander d'autres questions pour Logé", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1043'",
        "contrat salarié . convention collective . gardien concierge . logement":
          "'Logé'",
      });

      expect(result).toResultBeEqual(1, "mois");
      expect(result).toHaveReferencesBeEqual([
        {
          article: "Article 14",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9BE634B39A56D325EB33F7F23B8EC784.tplgfr36s_3?idArticle=KALIARTI000034978399&cidTexte=KALITEXT000021180979&dateTexte=29981231&categorieLien=id",
        },
      ]);
    });
  });
});
