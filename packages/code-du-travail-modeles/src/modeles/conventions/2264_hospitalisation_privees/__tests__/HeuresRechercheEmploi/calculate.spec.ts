import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "2264"
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
          article: "Article 43.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000020981959&cidTexte=KALITEXT000005658770&dateTexte=20200207",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . hospitalisation privées . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'L'employeur'",
        "contrat salarié . convention collective . hospitalisation privées . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . ancienneté":
          "'3 mois ou moins'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "2 jours, si le préavis (aussi appelé délai de prévenance) est executé",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 43.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000020981959&cidTexte=KALITEXT000005658770&dateTexte=20200207",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Chaque jour d'absence correspond à la durée habituelle de travail du salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . hospitalisation privées . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
          "'L'employeur'",
        "contrat salarié . convention collective . hospitalisation privées . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai L'employeur . ancienneté":
          "'Plus de 3 mois'",
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
          article: "Article 43.2",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000020981959&cidTexte=KALITEXT000005658770&dateTexte=20200207",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . typeRupture":
          "'Rupture de la période d'essai'",
        "contrat salarié . convention collective . hospitalisation privées . typeRupture Rupture de la période d'essai . initiative de la rupture de la période d'essai":
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
          article: "Article 46",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801981&cidTexte=KALITEXT000005658770",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . typeRupture":
          "'Démission'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire de travail dans l'entreprise",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 46",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801981&cidTexte=KALITEXT000005658770",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Ces heures pourront être prises par demi-journée ou journée entière, dans les conditions fixées d'un commun accord par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . hospitalisation privées . typeRupture Licenciement . durée du travail":
          "'Temps complet'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire de travail prévue par le contrat de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 46",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005801981&cidTexte=KALITEXT000005658770",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Ces heures pourront être prises par demi-journée ou journée entière, dans les conditions fixées d'un commun accord par l'employeur et le salarié.",
      ],
      situation: {
        "contrat salarié . convention collective . hospitalisation privées . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . hospitalisation privées . typeRupture Licenciement . durée du travail":
          "'Temps partiel'",
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
        "contrat salarié . convention collective": "'IDCC2264'",

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