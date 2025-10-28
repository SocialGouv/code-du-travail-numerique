import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "292"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Avenant Cadres, article 8",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005856728#KALIARTI000005856728",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié cadre peut s'absenter, en une ou plusieurs fois en accord avec l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . plasturgie . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . plasturgie . typeRupture Démission . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856709&cidTexte=KALITEXT000005682080&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. Ils peuvent décider de grouper ces heures. En l'absence d'accord, les heures sont fixées à tour de rôle par l'employeur et par le salarié. Le salarié qui a trouvé un emploi ne peut plus utiliser ces heures.",
      ],
      situation: {
        "contrat salarié . convention collective . plasturgie . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . plasturgie . typeRupture Démission . catégorie professionnelle":
          "'Non-cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Avenant Cadres, article 8",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005856728#KALIARTI000005856728",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié cadre peut s'absenter, en une ou plusieurs fois en accord avec l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . plasturgie . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . plasturgie . typeRupture Licenciement . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 15",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005856709&cidTexte=KALITEXT000005682080&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. Ils peuvent décider de grouper ces heures. En l'absence d'accord, les heures sont fixées à tour de rôle par l'employeur et par le salarié. Le salarié qui a trouvé un emploi ne peut plus utiliser ces heures.",
      ],
      situation: {
        "contrat salarié . convention collective . plasturgie . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . plasturgie . typeRupture Licenciement . catégorie professionnelle":
          "'Non-cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 8",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=749A300E450CB5EABE46C1A4B2EC63E3.tplgfr24s_2?idArticle=KALIARTI000005856324&cidTexte=KALITEXT000005682020&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . plasturgie . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC0292'",

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
