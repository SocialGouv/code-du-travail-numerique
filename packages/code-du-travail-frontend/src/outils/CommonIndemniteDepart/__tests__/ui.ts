import { byTestId, byText, byTitle } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
  contract: {
    type: {
      alert: byText("indemnité de précarité (nouvelle fenêtre)"),
      question: byText("Quel est le type du contrat de travail ?"),
      cdi: byTestId("typeContratTravail - Contrat à durée indéterminée (CDI)"),
      cdd: byTestId(
        "typeContratTravail - Contrat à durée déterminée (CDD) ou contrat d’intérim"
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
        "Le licenciement fait-il suite à une inaptitude professionnelle (suite à un accident du travail ou une maladie professionnelle reconnue) ?"
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
    agreementCompanySearchButton: byTestId("agreement-company-search-button"),
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
      transport: byText(
        "Transports routiers et activités auxiliaires du transport (IDCC 0016)"
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
    agreement675: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - habillement commerce succursales - catégorie professionnelle"
      ),
    },
    agreement44: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle"
      ),
      age: byTestId(
        "infos.contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle - age"
      ),
    },
    agreement2609: {
      age: byTestId(
        "infos.contrat salarié - convention collective - batiment etam - indemnité de licenciement - age à la fin de son préavis"
      ),
    },
    agreement2596: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - coiffure - indemnité de licenciement - catégorie professionnelle"
      ),
    },
    agreement1404: {
      cdiOperation: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - sedima - question cdi opération - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - sedima - question cdi opération - Non"
        ),
      },
      duree: byTestId(
        "infos.contrat salarié - convention collective - sedima - cdi opération - durée"
      ),
      salary1: byTestId(
        "infos.contrat salarié - convention collective - sedima - cdi opération - plus de 6 mois - salaires 1e année"
      ),
      salary2: byTestId(
        "infos.contrat salarié - convention collective - sedima - cdi opération - plus de 6 mois - salaires 2e année"
      ),
      salary3: byTestId(
        "infos.contrat salarié - convention collective - sedima - cdi opération - plus de 6 mois - salaires 3e année et plus"
      ),
      trial: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - sedima - cdi opération - moins de 6 mois - question période essai - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - sedima - cdi opération - moins de 6 mois - question période essai - Non"
        ),
      },
      salaryTotal: byTestId(
        "infos.contrat salarié - convention collective - sedima - cdi opération - moins de 6 mois - salaires total"
      ),
    },
    agreement2148: {
      age: byTestId(
        "infos.contrat salarié - convention collective - télécommunications - age"
      ),
    },
    agreement1486: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - bureaux études techniques - indemnité de licenciement - catégorie professionnelle"
      ),
      refus: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - bureaux études techniques - indemnité de licenciement - type de licenciement - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - bureaux études techniques - indemnité de licenciement - type de licenciement - Non"
        ),
      },
    },
    agreement573: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - commerces de gros - catégorie professionnelle"
      ),
      eco: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - commerces de gros - catégorie professionnelle - agents - licenciement économique question - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - commerces de gros - catégorie professionnelle - agents - licenciement économique question - Non"
        ),
      },
      age: byTestId(
        "infos.contrat salarié - convention collective - commerces de gros - catégorie professionnelle - agents - licenciement économique - age"
      ),
    },
    agreement2120: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - banque - catégorie professionnelle"
      ),
      eco: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - banque - licenciement économique - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - banque - licenciement économique - Non"
        ),
      },
    },
    agreement1672: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - sociétés d'assurances - catégorie professionnelle"
      ),
      nonCadreAvant: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - sociétés d'assurances - catégorie professionnelle - cadres - avant non cadres - Oui"
        ),
      },
      dateDebutCadre: byTestId(
        "infos.contrat salarié - convention collective - sociétés d'assurances - catégorie professionnelle - cadres - date du statut cadre"
      ),
      age: byTestId(
        "infos.contrat salarié - convention collective - sociétés d'assurances - age"
      ),
    },
    agreement1702: {
      motif: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - ouvriers travaux public - indemnité de licenciement - licenciement économique - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - ouvriers travaux public - indemnité de licenciement - licenciement économique - Non"
        ),
      },
      age: byTestId(
        "infos.contrat salarié - convention collective - ouvriers travaux public - indemnité de licenciement - age"
      ),
    },
    agreement3248: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle"
      ),
      dayContract: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour - Non"
        ),
      },
      alwaysDayContract: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - toujours au forfait jour - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - toujours au forfait jour - Non"
        ),
      },
      dateDayContract: byTestId(
        "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - forfait jour - date"
      ),
      hasBeenCadre: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - avant cadre - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - ABCDE - avant cadre - Non"
        ),
      },
      age: byTestId(
        "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - FGHI - age"
      ),
      retirementRight: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - FGHI - remplit conditions pour la retraite - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - catégorie professionnelle - FGHI - remplit conditions pour la retraite - Non"
        ),
      },
      absencesProlongesRepetes: {
        oui: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées - Oui"
        ),
        non: byTestId(
          "infos.contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées - Non"
        ),
      },
    },
    agreement29: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle"
      ),
    },
    agreement1501: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - restauration rapide - indemnité de licenciement - catégorie professionnelle"
      ),
      age: byTestId(
        "infos.contrat salarié - convention collective - restauration rapide - indemnité de licenciement - licenciement économique - age"
      ),
    },
    agreement2098: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - personnel presta service tertiaire - autre licenciement - catégorie professionnelle"
      ),
      age: byTestId(
        "infos.contrat salarié - convention collective - personnel presta service tertiaire - autre licenciement - cadres - age"
      ),
    },
    agreement2216: {
      proCategory: byTestId(
        "infos.contrat salarié - convention collective - commerce gros et detail alimentation - indemnité de licenciement - catégorie professionnelle"
      ),
      age: byTestId(
        "infos.contrat salarié - convention collective - commerce gros et detail alimentation - indemnité de licenciement - catégorie professionnelle - licenciement économique - age"
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
      motifs: byTestId(/absence-motif-[0-9]/),
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
    agreement29: {
      hasSiwMonthBestSalary: {
        oui: byTestId("hasSixBestSalaries - Oui"),
        non: byTestId("hasSixBestSalaries - Non"),
      },
    },
    agreementWithNoticeSalary: {
      knowingLastSalary: {
        oui: byTestId("hasReceivedSalaries - Oui"),
        non: byTestId("hasReceivedSalaries - Non"),
      },
      salaries: byTestId("notice-salary"),
      primes: byTestId("prime-notice-salary"),
    },
    agreement1517: {
      hasContractSalary: {
        oui: byTestId("hasContractSalary - Oui"),
        non: byTestId("hasContractSalary - Non"),
      },
    },
    agreement2120: {
      salariesVariablePart: byTestId("salariesVariablePart"),
    },
  },
  result: {
    resultat: byText(/À partir des éléments que vous avez saisis/),
    resultatLegal: byText(/Montant prévu par le code du travail/),
    resultatAgreement: byText(/Montant prévu par la convention collective/),
    data: byText(/Éléments saisis/),
    formula: byTestId("formula"),
    legalError: {
      title: byText(
        "Il n'y a pas d'indemnité de licenciement dans cette situation"
      ),
      cddLicenciement: byText(
        /L’indemnité de licenciement n’est pas due pour les CDD/
      ),
      cddRupture: byText(
        /L’indemnité de rupture conventionnelle n’est pas due pour les CDD/
      ),
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
    absences: {
      motif: byTestId("absence-motif"),
      duration: byTestId("absence-duration"),
    },
    resultTableRows: byTestId("table-result-row"),
    agreement3239: {
      result: byText(/À partir des éléments que vous avez saisis/),
    },
    dismissalType: {
      economic: byText(/Licenciement pour motif économique/),
      mobility: byText(
        /Le licenciement fait suite au refus d'une clause de mobilité/
      ),
      inaptitude: byText(
        /Licenciement pour inaptitude totale et définitive non consécutive à un accident du travail/
      ),
      discipline: byText(/Licenciement pour motif disciplinaire/),
    },
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTitle("onglet actif"),
  warning: byText("Attention"),
  title: byText("Calculer l'indemnité de licenciement"),
};
