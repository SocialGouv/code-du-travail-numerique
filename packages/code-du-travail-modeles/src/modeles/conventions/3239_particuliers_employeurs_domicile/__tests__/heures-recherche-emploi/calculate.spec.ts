import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";
const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "3239"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Assistants maternels du particulier employeur'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'Moins de 40 heures par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail Moins de 40 heures par semaine . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: {
        expectedValue: "",
        unit: "",
      },
      expectedReferences: [],
      expectedNotifications: [],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'Moins de 40 heures par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail Moins de 40 heures par semaine . ancienneté":
          "'2 ans ou plus'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour pendant 6 jours ouvrables",
        unit: "",
      },
      expectedReferences: [],
      expectedNotifications: [
        "Le salaire est maintenu. A défaut d'accord entre l'employeur et le salarié, les périodes de deux heures sont prises alternativement, un jour au choix du ou des particuliers employeurs et un jour au choix du salarié.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'40 heures ou plus par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail 40 heures ou plus par semaine . ancienneté":
          "'Moins de 2 ans'",
      },
    },
    {
      expectedResult: {
        expectedValue: "2 heures par jour pendant 10 jours ouvrables",
        unit: "",
      },
      expectedReferences: [],
      expectedNotifications: [
        "Le salaire est maintenu. A défaut d'accord entre l'employeur et le salarié, les périodes de deux heures sont prises alternativement, un jour au choix du ou des particuliers employeurs et un jour au choix du salarié.",
        "",
      ],
      situation: {
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'40 heures ou plus par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail 40 heures ou plus par semaine . ancienneté":
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
        "contrat salarié . convention collective": "'IDCC3239'",

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
