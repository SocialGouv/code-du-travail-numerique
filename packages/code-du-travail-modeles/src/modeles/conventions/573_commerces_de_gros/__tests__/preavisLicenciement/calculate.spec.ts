import { PreavisLicenciementPublicodes } from "../../../../../publicodes/PreavisLicenciement";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "573"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=20120228",
        },
      ],
      expectedNotifications: [
        "Cette durée s'applique aux techniciens et agents de maîtrise ou assimilés.",
      ],
      situation: {
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Agents de maîtrise et Techniciens'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=20120228",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=20120228",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle Ouvriers, Employés . motif de rupture":
          "'Autre motif hors faute grave ou lourde'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle Ouvriers, Employés . motif de rupture Autre motif hors faute grave ou lourde . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802012&cidTexte=KALITEXT000005673619&dateTexte=20120228",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle Ouvriers, Employés . motif de rupture":
          "'Autre motif hors faute grave ou lourde'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle Ouvriers, Employés . motif de rupture Autre motif hors faute grave ou lourde . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 38",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000026802006&cidTexte=KALITEXT000005673619&dateTexte=20120228",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle Ouvriers, Employés . motif de rupture":
          "'Motif économique'",
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
        "contrat salarié . convention collective": "'IDCC0573'",
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
