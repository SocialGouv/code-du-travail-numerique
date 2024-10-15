import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "2614"
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
          article: "Article 8.3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8DA312A2CD26D5839EA964715E620EBA.tplgfr30s_2?idArticle=KALIARTI000018926306&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . travaux publics . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue: "5 journées ou 10 demi-journées par mois de préavis",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 8.3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8DA312A2CD26D5839EA964715E620EBA.tplgfr30s_2?idArticle=KALIARTI000018926306&cidTexte=KALITEXT000018926214&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut s'absenter pendant le préavis pour rechercher un emploi, s'il le demande. Les heures de recherche d'emploi peuvent être prises en une ou plusieurs fois. Les autorisations d'absence seront fixées pour moitié par le salarié, pour moitié par l'employeur. Chacun en informe l'autre partie. Si le salarié n'utilise pas toutes ses heures d'absence autorisée, l'employeur ne devra pas lui verser d'indemnité.",
      ],
      situation: {
        "contrat salarié . convention collective . travaux publics . typeRupture":
          "'Licenciement'",
      },
    },
    {
      expectedResult: {
        expectedValue: "5 journées ou 10 demi-journées par mois de préavis",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 2.3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=11E262EBEBC0E8C3E4AF716770A04391.tplgfr30s_2?idArticle=KALIARTI000018926256&cidTexte=KALITEXT000018926214&dateTexte=20101004&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut s'absenter pendant le préavis pour rechercher un emploi, s'il le demande. Les heures de recherche d'emploi peuvent être prises en une ou plusieurs fois. Les autorisations d'absence seront fixées pour moitié par le salarié, pour moitié par l'employeur. Chacun en informe l'autre partie. Si le salarié n'utilise pas toutes ses heures d'absence autorisée, l'employeur ne devra pas lui verser d'indemnité.",
      ],
      situation: {
        "contrat salarié . convention collective . travaux publics . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC2614'",

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
