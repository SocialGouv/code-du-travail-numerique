import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "44"
);

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
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Agents de maîtrise . groupe":
          "'IV'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Agents de maîtrise . groupe IV . coefficient":
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
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Agents de maîtrise . groupe":
          "'IV'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Agents de maîtrise . groupe IV . coefficient":
          "'Supérieur à 275 inclus'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe I . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe I . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe I . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe I . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe I . coefficient":
          "'190 et plus'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe II . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe II . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe II . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe II . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe II . coefficient":
          "'190 et plus'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe III . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe III . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe III . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe III . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Employés'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Employés . groupe III . coefficient":
          "'190 et plus'",
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
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ingénieurs, Cadres . groupe":
          "'V'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe I . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe I . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe I . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe I . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe I . coefficient":
          "'190 et plus'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe II . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe II . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe II . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe II . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe II . coefficient":
          "'190 et plus'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe III . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe III . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe III . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe III . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Ouvriers'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Ouvriers . groupe III . coefficient":
          "'190 et plus'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe I . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe I . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe I . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe I . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'I'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe I . coefficient":
          "'190 et plus'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe II . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe II . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe II . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe II . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'II'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe II . coefficient":
          "'190 et plus'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe III . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe III . coefficient Inférieur à 190 . ancienneté":
          "'Moins de 2 ans'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe III . coefficient":
          "'Inférieur à 190'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe III . coefficient Inférieur à 190 . ancienneté":
          "'2 ans ou plus'",
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'III'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe III . coefficient":
          "'190 et plus'",
      },
    },
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'IV'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe IV . coefficient":
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
          "'Techniciens'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe":
          "'IV'",
        "contrat salarié . convention collective . industries chimiques . catégorie professionnelle Techniciens . groupe IV . coefficient":
          "'Supérieur à 275 inclus'",
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
