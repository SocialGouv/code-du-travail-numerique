import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "2098"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: "2 heures maximum par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 2.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=EF6F35108FA0CA7290B875B336ECB5AE.tplgfr33s_2?idArticle=KALIARTI000005850602&cidTexte=KALITEXT000005679323&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture Rupture de la période d'essai . catégorie professionnelle Cadres . initiative de la rupture de la période d'essai":
          "'L'employeur'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures maximum par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 2.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=EF6F35108FA0CA7290B875B336ECB5AE.tplgfr33s_2?idArticle=KALIARTI000005850602&cidTexte=KALITEXT000005679323&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture Rupture de la période d'essai . catégorie professionnelle Cadres . initiative de la rupture de la période d'essai":
          "'Le salarié'",
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
          article: "Article 13.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=F60F305A31ACE99142DBDEC2B2E8F383.tplgfr33s_2?idArticle=KALIARTI000005850302&cidTexte=KALITEXT000005679043&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture Rupture de la période d'essai . catégorie professionnelle":
          "'Noncadres'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures maximum par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 19",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=5E7FA0E54FCC9139328966B818999FA3.tplgfr33s_2?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures maximum par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 19",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=5E7FA0E54FCC9139328966B818999FA3.tplgfr33s_2?idArticle=KALIARTI000005850366&cidTexte=KALITEXT000005679043&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur. Les heures non utilisées ne sont pas rémunérées.",
      ],
      situation: {
        "contrat salarié . convention collective . personnel presta service tertiaire . typeRupture":
          "'Licenciement'",
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
        "contrat salarié . convention collective": "'IDCC2098'",

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
