import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1266"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration collectivités . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures doivent être prises en accord entre l'employeur et le salarié. Les parties pourront s'entendre pour bloquer tout ou partie de ces heures avant l'expiration du délai de préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . restauration collectivités . typeRupture":
          "'Licenciement'",
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
          article: "Article 13",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=7BE04E56DD26A6F4EA5E4E0CEB153D12.tplgfr24s_3?idArticle=KALIARTI000018649420&cidTexte=KALITEXT000005640427&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . restauration collectivités . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1266'",

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