import { byTestId, byText, byTitle } from "testing-library-selector";

import { ui as uiCommon } from "../../__tests__/ui";

export const ui = {
  ...uiCommon,
  contract: {
    type: {
      alert: byText("indemnité de précarité (nouvelle fenêtre)"),
      question: byText("Quel est le type du contrat de travail ?"),
      cdi: byTestId("typeContratTravail - Contrat à durée indeterminé (CDI)"),
      cdd: byTestId(
        "typeContratTravail - Contrat à durée determiné (CDD) ou contrat d’intérim"
      ),
    },
    fauteGrave: {
      alert: byText(
        "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
      ),
      question: byText(
        "Le licenciement est-il dû à une faute grave (ou lourde) ?"
      ),
      oui: byTestId("licenciementFauteGrave - Oui"),
      non: byTestId("licenciementFauteGrave - Non"),
    },
    inaptitude: {
      question: byText(
        "Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue ?"
      ),
      oui: byTestId("licenciementInaptitude - Oui"),
      non: byTestId("licenciementInaptitude - Non"),
    },
  },
  searchResult: {
    agreement16: {
      text: byText("Transports routiers et activités auxiliaires du transport"),
    },
    carrefourEnterprise: {
      text: byText("CARREFOUR HYPERMARCHES"),
      cc: {
        commerce: byText(
          "Commerce de détail et de gros à prédominance alimentaire (IDCC 2216)"
        ),
        bureau: byText(
          "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils (IDCC 1486)"
        ),
      },
    },
  },
  information: {
    agreement16: {
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
      driveInability: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ouvriers - incapacité de conduite - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ouvriers - incapacité de conduite - Non"
        ),
      },
    },
    agreement3239: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - particuliers employeurs et emploi à domicile - indemnité de licenciement - catégorie professionnelle"
      ),
    },
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
};
