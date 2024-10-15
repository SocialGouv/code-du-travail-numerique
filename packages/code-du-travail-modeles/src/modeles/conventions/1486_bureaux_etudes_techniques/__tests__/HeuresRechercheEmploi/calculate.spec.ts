import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1486"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: "6 jours ouvrés par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.3",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513835#KALIARTI000047513835",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Les heures de recherche d'emploi sont prises chaque mois en une ou plusieurs fois, en principe par demi-journée. Elles sont fixées pour moitié par l'employeur et pour moitié par le salarié. Chacun en informe l'autre partie.",
      ],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 3.4",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513825#KALIARTI000047513825",
        },
      ],
      expectedNotifications: ["Le salaire est maintenu.", ""],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . bureaux études techniques . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'L'employeur'",
      },
    },
    {
      expectedResult: { expectedValue: "2 heures par jour", unit: "" },
      expectedReferences: [
        {
          article: "Article 3.4",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513825#KALIARTI000047513825",
        },
      ],
      expectedNotifications: ["Le salaire n'est pas maintenu.", ""],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . bureaux études techniques . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'Le salarié'",
      },
    },
    {
      expectedResult: { expectedValue: "6 jours ouvrés par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.3",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513835#KALIARTI000047513835",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures de recherche d'emploi sont prises chaque mois en une ou plusieurs fois, en principe par demi-journée. Elles sont fixées pour moitié par l''employeur et pour moitié par le salarié. Chacun en informe l'autre partie.",
      ],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC1486'",

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
