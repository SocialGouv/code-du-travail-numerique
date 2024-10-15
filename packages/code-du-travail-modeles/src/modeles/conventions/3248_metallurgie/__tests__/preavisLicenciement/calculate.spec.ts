import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "3248"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'Moins de 50 ans'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
          "'A, B, C ou D'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position A, B, C ou D . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position A, B, C ou D . anciennement cadre Oui . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'Moins de 50 ans'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
          "'A, B, C ou D'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position A, B, C ou D . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position A, B, C ou D . anciennement cadre Oui . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'Moins de 50 ans'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
          "'E'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position E . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position E . anciennement cadre Oui . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'Moins de 50 ans'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
          "'E'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position E . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position E . anciennement cadre Oui . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'Moins de 50 ans'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position F, G, H ou I . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'Moins de 50 ans'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position F, G, H ou I . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 4, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'50 ans à 55 ans'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
          "'A, B, C ou D'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position A, B, C ou D . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position A, B, C ou D . anciennement cadre Oui . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'50 ans à 55 ans'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
          "'A, B, C ou D'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position A, B, C ou D . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position A, B, C ou D . anciennement cadre Oui . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 4, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'50 ans à 55 ans'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
          "'E'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position E . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position E . anciennement cadre Oui . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'50 ans à 55 ans'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
          "'E'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position E . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position E . anciennement cadre Oui . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 4, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'50 ans à 55 ans'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position F, G, H ou I . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'50 ans à 55 ans'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position F, G, H ou I . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'55 ans et plus'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
          "'A, B, C ou D'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position A, B, C ou D . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position A, B, C ou D . anciennement cadre Oui . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'55 ans et plus'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
          "'A, B, C ou D'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position A, B, C ou D . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position A, B, C ou D . anciennement cadre Oui . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'55 ans et plus'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
          "'E'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position E . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position E . anciennement cadre Oui . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
        {
          article: "Article 68",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'55 ans et plus'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
          "'E'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position E . anciennement cadre":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position E . anciennement cadre Oui . ancienneté":
          "'5 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'55 ans et plus'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position F, G, H ou I . ancienneté":
          "'Entre 3 ans et moins de 5 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 6, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 75.2.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
        },
      ],
      expectedNotifications: [
        "Si la lettre de licenciement a été présentée avant le 01/01/2024, la durée de préavis peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01/01/2024.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . âge":
          "'55 ans et plus'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
          "'F, G, H ou I'",
        "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position F, G, H ou I . ancienneté":
          "'5 ans ou plus'",
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
