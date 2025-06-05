import { PreavisDemissionPublicodes } from "../../../../../publicodes";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1486");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 21 de l'annexe relative aux enquêteurs",
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005761991&cidTexte=KALITEXT000005679885&idConvention=KALICONT000005635173&dateTexte=29990101",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Chargés d'enquête intermittents'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513833#KALIARTI000047513833",
        },
      ],
      expectedNotifications: [
        "L'employeur et le salarié peuvent décider d'une durée plus longue",
      ],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Employés, Techniciens ou Agents de maîtrise ETAM'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
          "'de 240 à 355'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient de 240 à 355 . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513833#KALIARTI000047513833",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Employés, Techniciens ou Agents de maîtrise ETAM'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
          "'de 240 à 355'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient de 240 à 355 . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513833#KALIARTI000047513833",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Employés, Techniciens ou Agents de maîtrise ETAM'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
          "'De 400 à 500'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient De 400 à 500 . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513833#KALIARTI000047513833",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Employés, Techniciens ou Agents de maîtrise ETAM'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
          "'De 400 à 500'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient De 400 à 500 . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2 de la convention collective",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513833#KALIARTI000047513833",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Ingénieurs, Cadres'",
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
