import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "176");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35, 2°",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117109",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail":
          "'Contrat de travail conclu avant le 1er juillet 2009'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail Contrat de travail conclu avant le 1er juillet 2009 . groupe":
          "'1 à 3'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35, 2°",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117109",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail":
          "'Contrat de travail conclu avant le 1er juillet 2009'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail Contrat de travail conclu avant le 1er juillet 2009 . groupe":
          "'4'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35, 2°",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117109",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail":
          "'Contrat de travail conclu avant le 1er juillet 2009'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail Contrat de travail conclu avant le 1er juillet 2009 . groupe":
          "'5 et suivants'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35, 2°",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117109",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail":
          "'Contrat de travail conclu après le 1er juillet 2009'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail Contrat de travail conclu après le 1er juillet 2009 . groupe":
          "'1 à 3'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35, 2°",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117109",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail":
          "'Contrat de travail conclu après le 1er juillet 2009'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail Contrat de travail conclu après le 1er juillet 2009 . groupe":
          "'4 à 5'",
      },
    },
    {
      expectedResult: { expectedValue: 4, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35, 2°",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117109?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117109",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail":
          "'Contrat de travail conclu après le 1er juillet 2009'",
        "contrat salarié . convention collective . industrie pharmaceutique . conclusion contrat travail Contrat de travail conclu après le 1er juillet 2009 . groupe":
          "'6 et suivants'",
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
        "contrat salarié . convention collective": "'IDCC0176'",

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
