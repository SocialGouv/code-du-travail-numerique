import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "675");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Article 9 de l'avenant Maîtrise Convention collective nationale du 30 juin 1972",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005752473&cidTexte=KALITEXT000005679768&idConvention=KALICONT000005635617&dateTexte=29990101",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":
          "'Agents de maîtrise'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Article 13 de l'avenant Cadres Convention collective nationale du 30 juin 1972",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005752482&cidTexte=KALITEXT000005679774&idConvention=KALICONT000005635617&dateTexte=29990101",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 0 },
      expectedReferences: [
        {
          article: "Article 38 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=087F78E34949639D3C28EC165BE5AB3A.tplgfr32s_2?idSectionTA=KALISCTA000005723965&cidTexte=KALITEXT000005679762&idConvention=KALICONT000005635617",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle Employés . ancienneté":
          "'Moins de 1 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 5, unit: "jours" },
      expectedReferences: [
        {
          article: "Article 38 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=087F78E34949639D3C28EC165BE5AB3A.tplgfr32s_2?idSectionTA=KALISCTA000005723965&cidTexte=KALITEXT000005679762&idConvention=KALICONT000005635617",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle Employés . ancienneté":
          "'1 mois à 6 mois'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 38 de la convention collective",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=087F78E34949639D3C28EC165BE5AB3A.tplgfr32s_2?idSectionTA=KALISCTA000005723965&cidTexte=KALITEXT000005679762&idConvention=KALICONT000005635617",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle Employés . ancienneté":
          "'Plus de 6 mois'",
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
        "contrat salarié . convention collective": "'IDCC0675'",

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
