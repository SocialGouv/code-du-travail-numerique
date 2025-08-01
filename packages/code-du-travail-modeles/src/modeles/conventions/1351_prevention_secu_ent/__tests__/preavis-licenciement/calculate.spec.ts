import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1351"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau I . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "jour ouvré" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau I . ancienneté":
          "'15 jours à 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "jours ouvrés" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau I . ancienneté":
          "'Plus de 1 mois à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 7, unit: "jours calendaires" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau I . ancienneté":
          "'Plus de 2 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau I . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau I . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau II . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "jour ouvré" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau II . ancienneté":
          "'15 jours à 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "jours ouvrés" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau II . ancienneté":
          "'Plus de 1 mois à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 7, unit: "jours calendaires" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau II . ancienneté":
          "'Plus de 2 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau II . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau II . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau III . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "jour ouvré" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau III . ancienneté":
          "'15 jours à 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "jours ouvrés" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau III . ancienneté":
          "'Plus de 1 mois à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 7, unit: "jours calendaires" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau III . ancienneté":
          "'Plus de 2 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau III . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau III . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau IV . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "jour ouvré" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau IV . ancienneté":
          "'15 jours à 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "jours ouvrés" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau IV . ancienneté":
          "'Plus de 1 mois à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 14, unit: "jours calendaires" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau IV . ancienneté":
          "'Plus de 2 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau IV . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau IV . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau V . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "jour ouvré" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau V . ancienneté":
          "'15 jours à 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "jours ouvrés" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau V . ancienneté":
          "'Plus de 1 mois à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 14, unit: "jours calendaires" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau V . ancienneté":
          "'Plus de 2 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau V . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe IV: Agents d'exploitation, employés administratifs et techniciens, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994249&cidTexte=KALITEXT000005680928&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents d'exploitation, employés administratifs et techniciens'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents d'exploitation, employés administratifs et techniciens . niveau V . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau I . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau I . ancienneté":
          "'15 jours à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau I . ancienneté":
          "'Plus de 2 mois à 3 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau I . ancienneté":
          "'Plus de 3 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau I . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'I'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau I . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau II . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau II . ancienneté":
          "'15 jours à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau II . ancienneté":
          "'Plus de 2 mois à 3 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau II . ancienneté":
          "'Plus de 3 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau II . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'II'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau II . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau III . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau III . ancienneté":
          "'15 jours à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau III . ancienneté":
          "'Plus de 2 mois à 3 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau III . ancienneté":
          "'Plus de 3 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau III . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'III'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau III . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau IV . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau IV . ancienneté":
          "'15 jours à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau IV . ancienneté":
          "'Plus de 2 mois à 3 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau IV . ancienneté":
          "'Plus de 3 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau IV . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'IV'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau IV . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau V . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "semaine" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau V . ancienneté":
          "'15 jours à 2 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau V . ancienneté":
          "'Plus de 2 mois à 3 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "semaines" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau V . ancienneté":
          "'Plus de 3 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau V . ancienneté":
          "'Plus de 6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe V: Agents de maîtrise, article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994252&cidTexte=KALITEXT000005680930&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau":
          "'V'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Agents de maîtrise . niveau V . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 0, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe VI: Cadres, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994255&cidTexte=KALITEXT000005680932&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Cadres . ancienneté":
          "'Moins de 15 jours'",
      },
    },
    {
      expectedResult: { expectedValue: 7, unit: "jours calendaires" },
      expectedReferences: [
        {
          article: "Annexe VI: Cadres, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994255&cidTexte=KALITEXT000005680932&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Cadres . ancienneté":
          "'15 jours à 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 14, unit: "jours calendaires" },
      expectedReferences: [
        {
          article: "Annexe VI: Cadres, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994255&cidTexte=KALITEXT000005680932&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 1 mois à 3 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe VI: Cadres, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994255&cidTexte=KALITEXT000005680932&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 3 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe VI: Cadres, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994255&cidTexte=KALITEXT000005680932&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 6 mois à 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Annexe VI: Cadres, article 9",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=E181308CF06395FB1FE9F409605264DE.tplgfr24s_1?idArticle=KALIARTI000021994255&cidTexte=KALITEXT000005680932&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . prevention sécurité entreprise . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 1 an'",
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
        "contrat salarié . convention collective": "'IDCC1351'",
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
