import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "2216");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 5 de l'annexe II",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=0B7BDDA80BCD42638DB0584F88087DBC.tplgfr30s_2?idArticle=KALIARTI000023307097&cidTexte=KALITEXT000005642662&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe III, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517551#KALIARTI000041517551",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 3 de l'annexe I",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=50DAAB41101DC91E64D73B9B365A0E69.tplgfr37s_2?idArticle=KALIARTI000005770839&cidTexte=KALITEXT000005642626&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . catégorie professionnelle":
          "'Ouvriers, Employés'",
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
        "contrat salarié . convention collective": "'IDCC2216'",

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
