import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1483"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AC41A834CDF3780188D24677B986910F.tplgfr41s_3?idArticle=KALIARTI000005840303&cidTexte=KALITEXT000005675211&dateTexte=20170222",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle Agents de maîtrise et Cadres . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour ouvré proportionnellement au temps de travail contractuel du salarié",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AC41A834CDF3780188D24677B986910F.tplgfr41s_3?idArticle=KALIARTI000005840303&cidTexte=KALITEXT000005675211&dateTexte=20170222",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle Agents de maîtrise et Cadres . durée du travail":
          "'Temps partiel'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour ouvré, proportionnellement au temps de travail contractuel du salarié, dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 16",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005840262&cidTexte=KALITEXT000005675211",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle Employés . durée du travail":
          "'Temps partiel'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 16",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005840262&cidTexte=KALITEXT000005675211",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Démission . catégorie professionnelle Employés . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour ouvré", unit: "" },
      expectedReferences: [
        {
          article: "Article 10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AC41A834CDF3780188D24677B986910F.tplgfr41s_3?idArticle=KALIARTI000005840303&cidTexte=KALITEXT000005675211&dateTexte=20170222",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle Agents de maîtrise et Cadres . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour ouvré proportionnellement au temps de travail contractuel du salarié",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AC41A834CDF3780188D24677B986910F.tplgfr41s_3?idArticle=KALIARTI000005840303&cidTexte=KALITEXT000005675211&dateTexte=20170222",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Si le contrat est rompu par l'employeur au cours du renouvellement de la période d'essai, le personnel d'encadrement est autorisé à s'absenter pendant le délai de prévenance (s'il est effectué), chaque jour ouvré pendant 2 heures, afin de rechercher un nouvel emploi jusqu'au moment où celui-ci aura été trouvé, dans la limite de 40 heures. Les heures d'absence sont fixées d'un commun accord entre les parties ou, à défaut, un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle Agents de maîtrise et Cadres . durée du travail":
          "'Temps partiel'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 16",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005840262&cidTexte=KALITEXT000005675211",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle Employés . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour ouvré dans une limite de 40 heures. Pour les salariés de l'arrondissement de Valenciennes, cette limite est portée à 50 heures",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 16",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005840262&cidTexte=KALITEXT000005675211",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence pour recherche d'emploi sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Elles peuvent aussi être regroupées, sur décision prise d'un commun accord entre l'employeur et le salarié. Dès que le salarié a retrouvé un emploi, il doit en informer son employeur et ne peut plus avoir droit à ces heures d'absence.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Licenciement . catégorie professionnelle Employés . durée du travail":
          "'Temps partiel'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9EAC3F9CEAFEEF1886BC40B199F0D838.tplgfr28s_1?idArticle=KALIARTI000022017236&cidTexte=KALITEXT000005675211&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: ["Le salaire est maintenu.", ""],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Rupture de la période d'essai . catégorie professionnelle Agents de maîtrise et Cadres . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 heures par jour proportionnellement au temps de travail contractuel du salarié",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 3",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=9EAC3F9CEAFEEF1886BC40B199F0D838.tplgfr28s_1?idArticle=KALIARTI000022017236&cidTexte=KALITEXT000005675211&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "",
        "Si le contrat est rompu par l'employeur au cours du renouvellement de la période d'essai, le personnel d'encadrement est autorisé à s'absenter pendant le délai de prévenance (s'il est effectué), chaque jour ouvré pendant 2 heures, afin de rechercher un nouvel emploi jusqu'au moment où celui-ci aura été trouvé, dans la limite de 40 heures. Les heures d'absence sont fixées d'un commun accord entre les parties ou, à défaut, un jour par l'employeur et le suivant par le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Rupture de la période d'essai . catégorie professionnelle Agents de maîtrise et Cadres . durée du travail":
          "'Temps partiel'",
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
          article: "Article 16",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005840262&cidTexte=KALITEXT000005675211",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Employés'",
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
        "contrat salarié . convention collective": "'IDCC1483'",

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