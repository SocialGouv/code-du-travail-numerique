import { PreavisDemissionPublicodes } from "../../../../../publicodes/PreavisDemission";

const engine = new PreavisDemissionPublicodes(modelsPreavisDemission, "1516");

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: 3, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=081E95519848F14B8C138A45AEF8D87F.tplgfr33s_2?idArticle=KALIARTI000005775560&cidTexte=KALITEXT000005644543&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "En cas de Démission, les délais accordés peuvent être très courts si, à la suite de la demande du salarié, l'employeur estime que le départ précipité de ce dernier ne perturbe pas la bonne marche de l'entreprise. Ces délais sont à discuter au cas par cas et ne peuvent, en tout état de cause, être supérieurs à la durée des préavis fixés cidessus en cas de Licenciement",
      ],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: 1, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=081E95519848F14B8C138A45AEF8D87F.tplgfr33s_2?idArticle=KALIARTI000005775560&cidTexte=KALITEXT000005644543&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [
        "En cas de Démission, les délais accordés peuvent être très courts si, à la suite de la demande du salarié, l'employeur estime que le départ précipité de ce dernier ne perturbe pas la bonne marche de l'entreprise. Ces délais sont à discuter au cas par cas et ne peuvent, en tout état de cause, être supérieurs à la durée des préavis fixés cidessus en cas de Licenciement",
      ],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle Employés . ancienneté":
          "'2 ans ou moins'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=081E95519848F14B8C138A45AEF8D87F.tplgfr33s_2?idArticle=KALIARTI000005775560&cidTexte=KALITEXT000005644543&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Employés'",
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle Employés . ancienneté":
          "'Plus de 2 ans'",
      },
    },
    {
      expectedResult: { expectedValue: 2, unit: "mois" },
      expectedReferences: [
        {
          article: "Article 9.1",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do;jsessionid=081E95519848F14B8C138A45AEF8D87F.tplgfr33s_2?idArticle=KALIARTI000005775560&cidTexte=KALITEXT000005644543&dateTexte=29990101&categorieLien=id",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . organismes de formation . catégorie professionnelle":
          "'Agents de maîtrise ou techniciens'",
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
        "contrat salarié . convention collective": "'IDCC1516'",

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
