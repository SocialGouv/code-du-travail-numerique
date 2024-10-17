import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes/HeuresRechercheEmploi";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "1090"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865234&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Le salarié peut s'absenter pendant 50 heures par mois, en une ou plusieurs fois en accord avec l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "24 heures", unit: "" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle Ouvriers, Employés . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle Ouvriers, Employés . durée du travail Temps complet . durée du préavis":
          "'2 semaines'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle Ouvriers, Employés . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle Ouvriers, Employés . durée du travail Temps complet . durée du préavis":
          "'Plus de 2 semaines'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "l'équivalent de 30% de l'horaire hebdomadaire inscrit au contrat de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire n'est pas maintenu.",
        "Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Démission'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . typeRupture Démission . catégorie professionnelle Ouvriers, Employés . durée du travail":
          "'Temps partiel'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 4.10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865234&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut s'absenter pendant 50 heures par mois, en une ou plusieurs fois en accord avec l'employeur.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle":
          "'Agents de maîtrise et Cadres'",
      },
    },
    {
      expectedResult: { expectedValue: "24 heures", unit: "" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle Ouvriers, Employés . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle Ouvriers, Employés . durée du travail Temps complet . durée du préavis":
          "'2 semaines'",
      },
    },
    {
      expectedResult: { expectedValue: "50 heures par mois", unit: "" },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle Ouvriers, Employés . durée du travail":
          "'Temps complet'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle Ouvriers, Employés . durée du travail Temps complet . durée du préavis":
          "'Plus de 2 semaines'",
      },
    },
    {
      expectedResult: {
        expectedValue:
          "l'équivalent de 30% de l'horaire hebdomadaire inscrit au contrat de travail",
        unit: "",
      },
      expectedReferences: [
        {
          article: "Article 2.12",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865064&categorieLien=cid",
        },
      ],
      expectedNotifications: [
        "Le salaire est maintenu.",
        "Le salarié peut prendre 2 heures par jour maximum. Si l'employeur et le salarié sont d'accord, les heures d'absence peuvent être cumulées en partie ou en totalité avant la fin du préavis.",
      ],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle":
          "'Ouvriers, Employés'",
        "contrat salarié . convention collective . automobiles . typeRupture Licenciement . catégorie professionnelle Ouvriers, Employés . durée du travail":
          "'Temps partiel'",
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
          article: "Article 4.10",
          url: "https://www.legifrance.gouv.fr/affichIDCCArticle.do?cidTexte=KALITEXT000005685156&idArticle=KALIARTI000005865234&categorieLien=cid",
        },
      ],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . automobiles . typeRupture":
          "'Rupture de la période d'essai'",
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
        "contrat salarié . convention collective": "'IDCC1090'",

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
