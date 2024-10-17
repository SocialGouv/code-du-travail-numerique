import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "2120"
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
          article: "Article 30",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=E5B5B8F059E9188492430B0C2B630256.tplgfr29s_3?idSectionTA=KALISCTA000005758006&cidTexte=KALITEXT000005678018&idConvention=KALICONT000005635780&dateTexte=29990101",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . banque . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 30",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=E5B5B8F059E9188492430B0C2B630256.tplgfr29s_3?idSectionTA=KALISCTA000005758006&cidTexte=KALITEXT000005678018&idConvention=KALICONT000005635780&dateTexte=29990101",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence sont fixées par accord entre l'employeur et le salarié. En cas de désaccord, elles sont fixées un jour par l'employeur, un jour par le salarié. Avec l'accord de l'employeur, elles peuvent être regroupées en fin de préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . banque . typeRupture":
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
          article: "Article 19",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=DCE4662A9AD24B88CA9D1F087148808C.tplgfr29s_3?idArticle=KALIARTI000005770247&cidTexte=KALITEXT000005678018&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . banque . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC2120'",

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
