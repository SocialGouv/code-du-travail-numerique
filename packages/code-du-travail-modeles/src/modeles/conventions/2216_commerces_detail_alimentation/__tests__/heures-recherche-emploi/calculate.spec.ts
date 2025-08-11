import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "2216"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue: "2 heures par jour pendant 1 mois",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe III, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517551#KALIARTI000041517551",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Ces heures sont fixées d'un commun accord entre le salarié et l'employeur. A la demande du salarié, elles peuvent être groupées en fin de semaine ou en fin de mois, compte tenu des nécessités du service. En l'absence d'accord entre l'employeur et le salarié, elles sont fixées un jour par le salarié, et le suivant par la direction, en tenant compte dans la mesure du possible des heures d'ouverture des agences de Pôle emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture Démission . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour pendant 1 mois",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe I, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517480#KALIARTI000041517480",
        },
        {
          article: "Annexe II, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517514#KALIARTI000041517514",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Ces heures sont fixées d'un commun accord entre le salarié et l'employeur. A la demande du salarié, elles peuvent être groupées en fin de semaine ou en fin de mois, compte tenu des nécessités du service. En l'absence d'accord entre l'employeur et le salarié, elles sont fixées un jour par le salarié, et le suivant par la direction, en tenant compte dans la mesure du possible des heures d'ouverture des agences de Pôle emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture Démission . catégorie professionnelle":
          "'Non-cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, chaque mois, à la durée hebdomadaire de travail dans l'établissement",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe III, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517551#KALIARTI000041517551",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "La répartition de ces absences se fera en accord avec la direction. Elles pourront être bloquées à la fin de chaque mois.",
      ],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture Licenciement . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour pendant 1 mois",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Annexe I, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517480#KALIARTI000041517480",
        },
        {
          article: "Annexe II, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517514#KALIARTI000041517514",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Ces heures sont fixées d'un commun accord entre le salarié et l'employeur. A la demande du salarié, elles peuvent être groupées en fin de semaine ou en fin de mois, compte tenu des nécessités du service. En l'absence d'accord entre l'employeur et le salarié, elles sont fixées un jour par le salarié, et le suivant par la direction, en tenant compte dans la mesure du possible des heures d'ouverture des agences de Pôle emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture Licenciement . catégorie professionnelle":
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
          article: "Annexe I, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517480#KALIARTI000041517480",
        },
        {
          article: "Annexe II, article 5",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517514#KALIARTI000041517514",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerce gros et detail alimentation . typeRupture":
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
        "contrat salarié . convention collective": "'IDCC2216'",

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
