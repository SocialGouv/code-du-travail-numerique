import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1486"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe relative aux enquêteurs - Accord du 16 décembre 1991, article 21",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005851319&cidTexte=KALITEXT000005679885&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Chargés d'enquête intermittents'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Chargés d'enquête intermittents . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article:
            "Annexe relative aux enquêteurs - Accord du 16 décembre 1991, article 21",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=AD49B0A01E6E5BBD82AB4F37A6387DAF.tplgfr25s_3?idArticle=KALIARTI000005851319&cidTexte=KALITEXT000005679885&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Chargés d'enquête intermittents'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Chargés d'enquête intermittents . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2",
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
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2",
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
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047513833#KALIARTI000047513833",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
          "'Employés, Techniciens ou Agents de maîtrise ETAM'",
        "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
          "'De 400 à 500'",
      },
    },
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 4.2",
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
