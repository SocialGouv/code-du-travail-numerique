import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1996"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "article 6 des dispositions particulières aux cadres",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=1FBE77FACF3A20C70C10CCE69F359D7B.tplgfr23s_1?idArticle=KALIARTI000005829442&cidTexte=KALITEXT000005671154&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . pharmacie . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "article 20 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005829411&cidTexte=KALITEXT000005671152",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . pharmacie . catégorie professionnelle":
          "'Noncadres'",
        "contrat salarié . convention collective . pharmacie . catégorie professionnelle Noncadres . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "article 20 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005829411&cidTexte=KALITEXT000005671152",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . pharmacie . catégorie professionnelle":
          "'Noncadres'",
        "contrat salarié . convention collective . pharmacie . catégorie professionnelle Noncadres . ancienneté":
          "'2 ans ou plus'",
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
        "contrat salarié . convention collective": "'IDCC1996'",
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
