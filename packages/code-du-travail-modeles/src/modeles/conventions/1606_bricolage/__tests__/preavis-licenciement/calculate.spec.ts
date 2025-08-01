import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1606"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: 'Annexe "agents de maîtrise" Article 9',
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8FADC689945C3C0383FA1D95820D6E17.tplgfr44s_1?idArticle=KALIARTI000005870772&cidTexte=KALITEXT000005687528&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'Entre 2 et 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: 'Annexe "agents de maîtrise" Article 9',
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8FADC689945C3C0383FA1D95820D6E17.tplgfr44s_1?idArticle=KALIARTI000005870772&cidTexte=KALITEXT000005687528&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Agents de maîtrise . ancienneté":
          "'Plus de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: 'Annexe "cadres" Article 9',
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8FADC689945C3C0383FA1D95820D6E17.tplgfr44s_1?idArticle=KALIARTI000005870787&cidTexte=KALITEXT000005687530&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Cadres . ancienneté":
          "'De 3 à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: 'Annexe "cadres" Article 9',
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=8FADC689945C3C0383FA1D95820D6E17.tplgfr44s_1?idArticle=KALIARTI000005870787&cidTexte=KALITEXT000005687530&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Cadres . ancienneté":
          "'Plus de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 0 },
      expectedReferences: [
        {
          article: "Article 9.2.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005870734&cidTexte=KALITEXT000005687520",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Employés . ancienneté":
          "'Moins de 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 15, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 9.2.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005870734&cidTexte=KALITEXT000005687520",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Employés . ancienneté":
          "'1 mois à moins de 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.2.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005870734&cidTexte=KALITEXT000005687520",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Employés . ancienneté":
          "'6 mois à 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.2.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?idArticle=KALIARTI000005870734&cidTexte=KALITEXT000005687520",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle Employés . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC1606'",
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
