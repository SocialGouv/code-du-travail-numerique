import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
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
    arretTravail: {
      question: byText(
        "Le salarié est-il en arrêt de travail au moment du licenciement ?"
      ),
      oui: byTestId("licenciementArretTravail - Oui"),
      non: byTestId("licenciementArretTravail - Non"),
    },
    dateArretTravail: byTestId("date-arret-travail"),
  },
  agreement: {
    noAgreement: byTestId(
      "route - Je ne souhaite pas renseigner ma convention collective (je passe l'étape)"
    ),
    agreement: byTestId(
      "route - Je sais quelle est ma convention collective (je la saisis)"
    ),
    unknownAgreement: byTestId(
      "route - Je ne sais pas quelle est ma convention collective (je la recherche)"
    ),
    agreementInput: byTestId("agreement-search-input"),
    agreementInputConfirm: byText(
      /Vous avez sélectionné la convention collective/
    ),
    agreementCompanyInput: byTestId("agreement-company-search-input"),
    agreementCompanyInputAsk: byText(
      "Précisez et sélectionnez votre entreprise"
    ),
    agreementCompanyInputConfirm: byText(/Vous avez sélectionné l'entreprise/),
    agreementPostalCodeInput: byTestId("agreement-postal-code-search-input"),
    searchItem: {
      agreement16: byText(
        "Transports routiers et activités auxiliaires du transport"
      ),
      agreement3239: byText("Particuliers employeurs et emploi à domicile"),
      carrefour: byText("CARREFOUR HYPERMARCHES"),
    },
    ccChoice: {
      commerce: byText(
        "Commerce de détail et de gros à prédominance alimentaire (IDCC 2216)"
      ),
      bureau: byText(
        "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils (IDCC 1486)"
      ),
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
      engineerAge: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ingénieurs et cadres - age"
      ),
      employeeAge: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - age"
      ),
      agentAge: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - age"
      ),
      workerAge: byTestId(
        "infos.contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle - Ouvriers - autres licenciement - age"
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
      radioCongeMatRupture: byText(
        "La rupture du contrat de travail fait-elle suite à la suspension, à la modification ou au retrait de l'agrément de l'assistant maternel ?"
      ),
      congeMatSuspension: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - particuliers employeurs et emploi à domicile - indemnité de licenciement - catégorie professionnelle - assistante maternelle - type de licenciement - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - particuliers employeurs et emploi à domicile - indemnité de licenciement - catégorie professionnelle - assistante maternelle - type de licenciement - Non"
        ),
      },
      salaryInput: byTestId(
        "infos.contrat salarié - convention collective - particuliers employeurs et emploi à domicile - indemnité de licenciement - catégorie professionnelle - assistante maternelle - type de licenciement - autres - total salaires"
      ),
    },
    agreement413: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - établissement handicap - indemnité de licenciement - catégorie professionnelle"
      ),
    },
    agreement44: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle"
      ),
      economicFire: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle - licenciement économique - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle - licenciement économique - Non"
        ),
      },
      age: byTestId(
        "infos.contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle - licenciement économique - age"
      ),
    },
    agreement2609: {
      age: byTestId(
        "infos.contrat salarié - convention collective - batiment etam - indemnité de licenciement - age à la fin de son préavis"
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
    variablePart: {
      oui: byTestId("hasVariablePay - Oui"),
      non: byTestId("hasVariablePay - Non"),
    },
    salaries: byTestId("salary-input"),
    primes: byTestId("prime-input"),
    agreement44: {
      knowingLastSalary: {
        oui: byTestId("knowingLastSalary - Oui"),
        non: byTestId("knowingLastSalary - Non"),
      },
      salaries: byTestId("last-month-salary"),
      primes: byTestId("prime-last-month-salary"),
    },
  },
  result: {
    formula: byTestId("formula"),
    legalError: {
      title: byText(
        "Il n'y a pas d'indemnité de licenciement dans cette situation"
      ),
      cdd: byText(/L’indemnité de licenciement n’est pas due pour les CDD/),
      fauteGrave: byText(
        /L’indemnité de licenciement n’est pas due en cas de faute grave/
      ),
      seniorityToLow: byText(
        /L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois/
      ),
      specific: {
        agreement3239: {
          suspendedNotEligible: byText(
            /L’indemnité de licenciement n’est pas due en cas de suspension, modification ou retrait de l'agrément de l'assistant maternel./
          ),
          lessThan9month: byText(
            /L’indemnité de licenciement n’est pas due lorsque l’ancienneté de l'assistant maternel est inférieure à 9 mois./
          ),
        },
      },
    },
    infoWarning: {
      eligibleInfoWarningblock: byTestId("eligible-cc-disclaimer"),
      ineligibleInfoWarningblock: byTestId("ineligible-cc-disclaimer"),
      title: {
        eligible: byText("Attention il peut exister un montant plus favorable"),
        ineligible: byText(
          "Attention il peut quand même exister une indemnité pour le salarié"
        ),
      },
      message: {
        mayBeMoreFavorableCC: byText(
          /Une convention collective, un accord d’entreprise, le contrat de travail ou un usage peut prévoir un montant plus favorable pour le salarié. Dans ce cas, c’est ce montant plus favorable qui s’applique au salarié./
        ),
        mayBeMoreFavorableFirmAgreement: byText(
          /Un accord d’entreprise, le contrat de travail ou un usage peut prévoir un montant plus favorable pour le salarié. Dans ce cas, c’est ce montant plus favorable qui s’applique au salarié./
        ),
        mayBeCC: byText(
          /Une convention collective, un accord d’entreprise, le contrat de travail ou un usage peut prévoir une indemnité pour le salarié./
        ),
        maybeFirmAgreement: byText(
          /Un accord d’entreprise, le contrat de travail ou un usage peut prévoir une indemnité pour le salarié./
        ),
      },
    },
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTitle("onglet actif"),
  warning: byText("Attention"),
  title: byText("Calculer l'indemnité de licenciement"),
};
