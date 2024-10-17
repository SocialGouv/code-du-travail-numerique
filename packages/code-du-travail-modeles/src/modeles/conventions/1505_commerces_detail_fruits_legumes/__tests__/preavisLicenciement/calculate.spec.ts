import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1505"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "article 20",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005874369&cidTexte=KALITEXT000005689370&dateTexte=20110613",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle":
          "'Agents de maîtrise AM1 et AM2'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562749#KALIARTI000043562749",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle":
          "'Cadres C1 et C2'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562749#KALIARTI000043562749",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle":
          "'Employés E1 à E7'",
        "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle Employés E1 à E7 . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043562749#KALIARTI000043562749",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle":
          "'Employés E1 à E7'",
        "contrat salarié . convention collective . commerces de détail fruits et légumes . catégorie professionnelle Employés E1 à E7 . ancienneté":
          "'Plus de 2 ans'",
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
        "contrat salarié . convention collective": "'IDCC1505'",
        "contrat salarié . convention collective . ancienneté légal":
          "'Moins de 6 mois'",
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
