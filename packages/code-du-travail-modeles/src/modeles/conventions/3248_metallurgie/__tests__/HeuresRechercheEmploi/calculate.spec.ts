import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "3248"
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
          article: "Article 70.5.3.2",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314504?idConteneur=KALICONT000046993250#KALIARTI000046314504",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'L'employeur'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour Oui . ancienneté":
          "'moins d'un mois'",
      },
    },
    {
      expectedResult: {
        expectedValue: "1 jour pour 2 semaines de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 70.5.3.2",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314504?idConteneur=KALICONT000046993250#KALIARTI000046314504",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Cette journée est convenue entre l'employeur et le salarié. En l'absence d'accord, elle est fixée une fois par l’employeur et une fois par le salarié. Si la durée du délai de prévenance est égale à 2 semaines, la journée est fixée par l'employeur. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'L'employeur'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour":
          "'Oui'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour Oui . ancienneté":
          "'un mois ou plus'",
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
          article: "Article 70.5.3.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314503?idConteneur=KALICONT000046993250#KALIARTI000046314503",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'L'employeur'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour":
          "'Non'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour Non . ancienneté":
          "'moins d'un mois'",
      },
    },
    {
      expectedResult: { expectedValue: "2h30 par jour travaillé", unit: "" },
      expectedReferences: [
        {
          article: "Article 70.5.3.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314503?idConteneur=KALICONT000046993250#KALIARTI000046314503",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "L’utilisation de ces heures, y compris leur regroupement éventuel, est convenue entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'L'employeur'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour":
          "'Non'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . forfait jour Non . ancienneté":
          "'un mois ou plus'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
        unit: "",
      },
      expectedReferences: [],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . métallurgie . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
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
          article: "Article 74.2.2",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314526?idConteneur=KALICONT000046993250#KALIARTI000046314526",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2h30 maximum par jour travaillé (dans la limite de 50 heures par mois de préavis)",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 75.2.3.1",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314533?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314533",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "L'employeur et le salarié s’entendent sur les modalités de prise de ces heures (y compris sur leur regroupement éventuel). À défaut d'accord entre les parties, les heures sont fixées alternativement un jour par l'employeur et un jour par le salarié. Elles peuvent être regroupées si le salarié occupe un poste qui présente des contraintes d’organisation particulières. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . métallurgie . typeRupture Licenciement . forfait jour":
          "'Non'",
      },
    },
    {
      expectedResult: {
        expectedValue: "1 jour pour 2 semaines de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 75.2.3.2",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314534?idConteneur=KALICONT000046993250#KALIARTI000046314534",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Cette journée est convenue entre l'employeur et le salarié. En l'absence d'accord, elle est fixée une fois par l’employeur et une fois par le salarié. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi.",
      ],
      situation: {
        "contrat salarié . convention collective . métallurgie . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . métallurgie . typeRupture Licenciement . forfait jour":
          "'Oui'",
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
        "contrat salarié . convention collective": "'IDCC3248'",

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
