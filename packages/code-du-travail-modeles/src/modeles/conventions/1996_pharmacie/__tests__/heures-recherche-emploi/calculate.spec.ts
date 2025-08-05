import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1996"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour, dans la limite d'un tiers du temps de travail pour un salarié à temps partiel",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 6 des dispositions particulières pour les cadres",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=D6E073ACFE608C0EC96C2F6997BEBF66.tplgfr41s_1?idSectionTA=KALISCTA000005714852&cidTexte=KALITEXT000005671154&idConvention=KALICONT000005635528",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande.",
      ],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
          "'Démission ou licenciement'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle Cadres . durée du travail":
          "'Temps partiel'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 6 des dispositions particulières pour les cadres",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=D6E073ACFE608C0EC96C2F6997BEBF66.tplgfr41s_1?idSectionTA=KALISCTA000005714852&cidTexte=KALITEXT000005671154&idConvention=KALICONT000005635528",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande.",
      ],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
          "'Démission ou licenciement'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle Cadres . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005829411&cidTexte=KALITEXT000005671152&dateTexte=20180607",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande",
      ],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
          "'Démission ou licenciement'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle":
          "'Non-cadres'",
        "contrat salarié . convention collective . pharmacie . typeRupture Démission ou licenciement . catégorie professionnelle Noncadres . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 19",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=27F4F2F70EACAC6453704FD11023F9A4.tplgfr41s_1?idArticle=KALIARTI000038106390&cidTexte=KALITEXT000005671152&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . pharmacie . typeRupture":
          "'Rupture de la période d'essai'",
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
        "contrat salarié . convention collective": "'IDCC1996'",

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
