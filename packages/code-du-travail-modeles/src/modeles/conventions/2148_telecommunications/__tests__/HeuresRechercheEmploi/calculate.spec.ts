import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "2148"
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
          article: "Article 4.4.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . télécommunications . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.4.1.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9136FD3448350FB8507D33D3CE4F3321.tplgfr36s_2?idArticle=KALIARTI000022416125&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Ces heures sont fixées en accord avec l'employeur. En l'absence d'accord, les heures sont fixées un jour par le salarié et le suivant par l'employeur. L'employeur peut autoriser par écrit le salarié à cumuler ces heures de recherche d'emploi en fin de période de préavis, si les nécessités du service le permettent et dans la limite de la durée effectuée du préavis",
      ],
      situation: {
        "contrat salarié . convention collective . télécommunications . typeRupture":
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
          article: "Article 4.2.3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=26A7FB6F5D2CA4C5CB2E074D4254C88D.tplgfr36s_2?idArticle=KALIARTI000022416110&cidTexte=KALITEXT000005677399&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . télécommunications . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC2148'",

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
