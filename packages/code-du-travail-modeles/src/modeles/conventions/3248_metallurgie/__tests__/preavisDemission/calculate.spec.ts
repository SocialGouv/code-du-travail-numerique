import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "3248");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Article 74.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314525?idConteneur=KALICONT000046993250#KALIARTI000046314525",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
        {
          article:
            "Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit",
          url: "https://www.legifrance.gouv.fr/juri/id/JURITEXT000043352346",
        },
      ],
      expectedNotifications: [
        "Si la lettre de démission a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . groupe":
          "'A ou B'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 74.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314525?idConteneur=KALICONT000046993250#KALIARTI000046314525",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
        {
          article:
            "Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit",
          url: "https://www.legifrance.gouv.fr/juri/id/JURITEXT000043352346",
        },
      ],
      expectedNotifications: [
        "Si la lettre de démission a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . groupe": "'C'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 74.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314525?idConteneur=KALICONT000046993250#KALIARTI000046314525",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
        {
          article:
            "Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit",
          url: "https://www.legifrance.gouv.fr/juri/id/JURITEXT000043352346",
        },
      ],
      expectedNotifications: [
        "Si la lettre de démission a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . groupe":
          "'D ou E'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 74.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314525?idConteneur=KALICONT000046993250#KALIARTI000046314525",
        },
      ],
      expectedNotifications: [
        "Si la lettre de démission a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . groupe":
          "'F, G, H ou I'",
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
        "contrat salarié . convention collective": "'IDCC3248'",

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