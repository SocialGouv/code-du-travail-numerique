import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1518"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures peuvent être cumulées en fin de préavis après accord entre le salarié et l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps complet . ancienneté":
          "'Moins de 1 an'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures peuvent être cumulées en fin de préavis après accord entre le salarié et l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps complet . ancienneté":
          "'Plus de 1 an'",
      },
    },
    {
      expectedResult: {
        expectedValue: "25 % de la durée quotidienne de travail par jour",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Le salarié peut cumuler ces heures d'absence en fin de préavis sans obtenir l'accord de l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps partiel'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps partiel . ancienneté":
          "'Moins de 1 an'",
      },
    },
    {
      expectedResult: {
        expectedValue: "25 % de la durée quotidienne de travail par jour",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut cumuler ces heures d'absence en fin de préavis sans obtenir l'accord de l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail":
          "'Temps partiel'",
        "contrat salarié . convention collective . éducation et loisirs . typeRupture Licenciement . durée du travail Temps partiel . ancienneté":
          "'Plus de 1 an'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F6466B2FD646502AAD4864291B818763.tplgfr27s_1?idArticle=KALIARTI000032495095&cidTexte=KALITEXT000005681198&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 4.4 étendu",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=90DC79AA1CCEE975F34768978174ECA2.tplgfr27s_1?idArticle=KALIARTI000038525633&cidTexte=KALITEXT000005681198&dateTexte=29981231&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . éducation et loisirs . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1518'",

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
