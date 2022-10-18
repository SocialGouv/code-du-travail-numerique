import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
  contract: {
    type: {
      cdi: byTestId("typeContratTravail - Contrat à durée indeterminé (CDI)"),
      cdd: byTestId(
        "typeContratTravail - Contrat à durée determiné (CDD) ou contrat d’intérim"
      ),
    },
    fauteGrave: {
      oui: byTestId("licenciementFauteGrave - Oui"),
      non: byTestId("licenciementFauteGrave - Non"),
    },
    inaptitude: {
      oui: byTestId("licenciementInaptitude - Oui"),
      non: byTestId("licenciementInaptitude - Non"),
    },
  },
  agreement: {
    noAgreement: byTestId(
      "route - Je ne souhaite pas renseigner ma convention collective (je passe l'étape)"
    ),
  },
  information: {
    proCategory: byTestId(
      "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle"
    ),
    proCategoryHasChanged: {
      oui: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ingénieurs et cadres - avant employé ou technicien - Oui"
      ),
      non: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ingénieurs et cadres - avant employé ou technicien - Non"
      ),
    },
    dateProCategoryChanged: byTestId(
      "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ingénieurs et cadres - date du statut cadre"
    ),
    age: byTestId(
      "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ingénieurs et cadres - age"
    ),
  },
  seniority: {
    startDate: byTestId("date-entree"),
    notificationDate: byTestId("date-notification"),
    endDate: byTestId("date-sortie"),
    hasAbsence: {
      oui: byTestId("hasAbsenceProlonge - Oui"),
      non: byTestId("hasAbsenceProlonge - Non"),
    },
    absences: {
      motif: (index: number) => byTestId(`absence-motif-${index}`),
      duration: (index: number) => byTestId(`absence-duree-${index}`),
      date: (index: number) => byTestId(`absence-date-${index}`),
    },
  },
  salary: {
    hasPartialTime: {
      oui: byTestId("hasTempsPartiel - Oui"),
      non: byTestId("hasTempsPartiel - Non"),
    },
    hasSameSalary: {
      oui: byTestId("hasSameSalary - Oui"),
      non: byTestId("hasSameSalary - Non"),
    },
    sameSalaryValue: byTestId("same-salary-value"),
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTitle("onglet actif"),
};
