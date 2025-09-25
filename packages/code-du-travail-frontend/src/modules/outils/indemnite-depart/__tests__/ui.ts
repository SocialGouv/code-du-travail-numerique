import { byDisplayValue, byTestId, byText } from "testing-library-selector";

export const ui = {
  introduction: {
    startButton: byText("Commencer"),
  },
  contract: {
    type: {
      alert: byText("indemnité de précarité (nouvelle fenêtre)"),
      question: byText("Quel est le type du contrat de travail ?"),
      cdi: byTestId("typeContratTravail-Contrat à durée indéterminée (CDI)"),
      cdd: byTestId(
        "typeContratTravail-Contrat à durée déterminée (CDD) ou contrat d'intérim"
      ),
    },
    fauteGrave: {
      alert: byText(
        "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
      ),
      question: byText(
        "Le licenciement est-il dû à une faute grave (ou lourde) ?"
      ),
      oui: byTestId("licenciementFauteGrave-Oui"),
      non: byTestId("licenciementFauteGrave-Non"),
    },
    inaptitude: {
      question: byText(
        "Le licenciement fait-il suite à une inaptitude professionnelle (suite à un accident du travail ou une maladie professionnelle reconnue) ?"
      ),
      oui: byTestId("licenciementInaptitude-Oui"),
      non: byTestId("licenciementInaptitude-Non"),
    },
    arretTravail: {
      question: byText(
        "Le salarié est-il en arrêt de travail au moment du licenciement ?"
      ),
      oui: byTestId("licenciementArretTravail-Oui"),
      non: byTestId("licenciementArretTravail-Non"),
    },
    dateArretTravail: byTestId("date-arret-travail"),
  },
  agreement: {
    noAgreement: byTestId(
      "route-Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    ),
    agreement: byTestId(
      "route-Je sais quelle est ma convention collective et je la saisis."
    ),
    unknownAgreement: byTestId(
      "route-Je ne sais pas quelle est ma convention collective et je la recherche."
    ),
    agreementInput: byTestId("AgreementSearchAutocomplete"),
    agreementCompanyInput: byTestId("enterprise-search-input"),
    agreementCompanySearchButton: byTestId("agreement-company-search-button"),
    agreementCompanyInputAsk: byText("Précisez votre entreprise"),
    agreementCompanyInputConfirm: byText(/Votre entreprise/),
    agreementPostalCodeInput: byTestId("locationSearchAutocomplete"),
    searchItem: {
      agreement16: byDisplayValue(
        "Transports routiers et activités auxiliaires du transport (IDCC 16)"
      ),
      agreement3239: byDisplayValue(
        "Particuliers employeurs et emploi à domicile (IDCC 3239)"
      ),
      carrefour: byText("CARREFOUR HYPERMARCHES"),
      bricomanie: byText("BRICOMANIE"),
    },
    ccChoice: {
      commerce: byText(
        "Commerce de détail et de gros à prédominance alimentaire IDCC 2216"
      ),
      transport: byText(
        "Transports routiers et activités auxiliaires du transport (IDCC 16)"
      ),
      bureau: byText(
        "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils IDCC 1486"
      ),
    },
  },
  information: {
    agreement16: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle"
      ),
      proCategoryHasChanged: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle-Ingenieurs-et-cadres-avant-employe-ou-technicien-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle-Ingenieurs-et-cadres-avant-employe-ou-technicien-Non"
        ),
      },
      dateProCategoryChanged: byTestId(
        "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle-Ingenieurs-et-cadres-date-du-statut-cadre"
      ),
      engineerAge: byTestId(
        "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle-Ingenieurs-et-cadres-age"
      ),
      ruptureEngineerAge: byTestId(
        "infos-contrat-salarie-convention-collective-transports-routiers-rupture-conventionnelle-cadre-age"
      ),
      employeeAge: byTestId(
        "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-age"
      ),
      agentAge: byTestId(
        "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-age"
      ),
      workerAge: byTestId(
        "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle-Ouvriers-autres-licenciement-age"
      ),
      driveInability: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle-Ouvriers-incapacite-de-conduite-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-transports-routiers-indemnite-de-licenciement-categorie-professionnelle-Ouvriers-incapacite-de-conduite-Non"
        ),
      },
    },
    agreement3239: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle"
      ),
      radioCongeMatRupture: byText(
        "La rupture du contrat de travail fait-elle suite à la suspension, à la modification ou au retrait de l'agrément de l'assistant maternel ?"
      ),
      congeMatSuspension: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle-assistante-maternelle-type-de-licenciement-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle-assistante-maternelle-type-de-licenciement-Non"
        ),
      },
      salaryInput: byTestId(
        "infos-contrat-salarie-convention-collective-particuliers-employeurs-et-emploi-a-domicile-indemnite-de-licenciement-categorie-professionnelle-assistante-maternelle-type-de-licenciement-autres-total-salaires"
      ),
    },
    agreement413: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-etablissement-handicap-indemnite-de-licenciement-categorie-professionnelle"
      ),
    },
    agreement675: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-habillement-commerce-succursales-categorie-professionnelle"
      ),
    },
    agreement44: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-industries-chimiques-indemnite-de-licenciement-categorie-professionnelle"
      ),
      age: byTestId(
        "infos-contrat-salarie-convention-collective-industries-chimiques-indemnite-de-licenciement-categorie-professionnelle-age"
      ),
      ruptureAge: byTestId(
        "infos-contrat-salarie-convention-collective-industries-chimiques-rupture-conventionnelle-age"
      ),
    },
    agreement2609: {
      age: byTestId(
        "infos-contrat-salarie-convention-collective-batiment-etam-indemnite-de-licenciement-age-a-la-fin-de-son-preavis"
      ),
    },
    agreement2596: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-coiffure-indemnite-de-licenciement-categorie-professionnelle"
      ),
    },
    agreement1404: {
      cdiOperation: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-sedima-question-cdi-operation-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-sedima-question-cdi-operation-Non"
        ),
      },
      duree: byTestId(
        "infos-contrat-salarie-convention-collective-sedima-cdi-operation-duree"
      ),
      salary1: byTestId(
        "infos-contrat-salarie-convention-collective-sedima-cdi-operation-plus-de-6-mois-salaires-1e-annee"
      ),
      salary2: byTestId(
        "infos-contrat-salarie-convention-collective-sedima-cdi-operation-plus-de-6-mois-salaires-2e-annee"
      ),
      salary3: byTestId(
        "infos-contrat-salarie-convention-collective-sedima-cdi-operation-plus-de-6-mois-salaires-3e-annee-et-plus"
      ),
      trial: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-sedima-cdi-operation-moins-de-6-mois-question-periode-essai-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-sedima-cdi-operation-moins-de-6-mois-question-periode-essai-Non"
        ),
      },
      salaryTotal: byTestId(
        "infos-contrat-salarie-convention-collective-sedima-cdi-operation-moins-de-6-mois-salaires-total"
      ),
    },
    agreement2148: {
      age: byTestId(
        "infos-contrat-salarie-convention-collective-telecommunications-age"
      ),
    },
    agreement1486: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-bureaux-etudes-techniques-indemnite-de-licenciement-categorie-professionnelle"
      ),
      refus: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-bureaux-etudes-techniques-indemnite-de-licenciement-type-de-licenciement-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-bureaux-etudes-techniques-indemnite-de-licenciement-type-de-licenciement-Non"
        ),
      },
    },
    agreement573: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-commerces-de-gros-categorie-professionnelle"
      ),
      eco: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-gros-categorie-professionnelle-agents-licenciement-economique-question-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-commerces-de-gros-categorie-professionnelle-agents-licenciement-economique-question-Non"
        ),
      },
      age: byTestId(
        "infos-contrat-salarie-convention-collective-commerces-de-gros-categorie-professionnelle-agents-licenciement-economique-age"
      ),
      ageRupture: byTestId(
        "infos-contrat-salarie-convention-collective-commerces-de-gros-rupture-conventionnelle-licenciement-economique-agents-age"
      ),
    },
    agreement2120: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-banque-categorie-professionnelle"
      ),
      eco: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-banque-licenciement-economique-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-banque-licenciement-economique-Non"
        ),
      },
    },
    agreement1672: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-societes-d'assurances-categorie-professionnelle"
      ),
      nonCadreAvant: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-societes-d'assurances-categorie-professionnelle-cadres-avant-non-cadres-Oui"
        ),
      },
      dateDebutCadre: byTestId(
        "infos-contrat-salarie-convention-collective-societes-d'assurances-categorie-professionnelle-cadres-date-du-statut-cadre"
      ),
      age: byTestId(
        "infos-contrat-salarie-convention-collective-societes-d'assurances-age"
      ),
    },
    agreement1702: {
      motif: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-travaux-public-indemnite-de-licenciement-licenciement-economique-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-ouvriers-travaux-public-indemnite-de-licenciement-licenciement-economique-Non"
        ),
      },
      age: byTestId(
        "infos-contrat-salarie-convention-collective-ouvriers-travaux-public-indemnite-de-licenciement-age"
      ),
      ruptureAge: byTestId(
        "infos-contrat-salarie-convention-collective-ouvriers-travaux-public-rupture-conventionnelle-age"
      ),
    },
    agreement3248: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle"
      ),
      dayContract: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-ABCDE-forfait-jour-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-ABCDE-forfait-jour-Non"
        ),
      },
      alwaysDayContract: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-ABCDE-toujours-au-forfait-jour-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-ABCDE-toujours-au-forfait-jour-Non"
        ),
      },
      dateDayContract: byTestId(
        "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-ABCDE-forfait-jour-date"
      ),
      hasBeenCadre: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-ABCDE-avant-cadre-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-ABCDE-avant-cadre-Non"
        ),
      },
      age: byTestId(
        "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-FGHI-age"
      ),
      retirementRight: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-FGHI-remplit-conditions-pour-la-retraite-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-categorie-professionnelle-FGHI-remplit-conditions-pour-la-retraite-Non"
        ),
      },
      absencesProlongesRepetes: {
        oui: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-licenciement-pour-motif-absence-prolongee-ou-repetees-Oui"
        ),
        non: byTestId(
          "infos-contrat-salarie-convention-collective-metallurgie-indemnite-de-licenciement-licenciement-pour-motif-absence-prolongee-ou-repetees-Non"
        ),
      },
    },
    agreement29: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-hospitalisation-privee-a-but-non-lucratif-indemnite-de-licenciement-categorie-professionnelle"
      ),
    },
    agreement1501: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-restauration-rapide-indemnite-de-licenciement-categorie-professionnelle"
      ),
      age: byTestId(
        "infos-contrat-salarie-convention-collective-restauration-rapide-indemnite-de-licenciement-licenciement-economique-age"
      ),
      ruptureAge: byTestId(
        "infos-contrat-salarie-convention-collective-restauration-rapide-rupture-conventionnelle-age"
      ),
    },
    agreement2098: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-autre-licenciement-categorie-professionnelle"
      ),
      age: byTestId(
        "infos-contrat-salarie-convention-collective-personnel-presta-service-tertiaire-rupture-conventionnelle-cadre-age"
      ),
      inaptitudeNonPro: byText("Oui"),
    },
    agreement2216: {
      proCategory: byTestId(
        "infos-contrat-salarie-convention-collective-commerce-gros-et-detail-alimentation-indemnite-de-licenciement-categorie-professionnelle"
      ),
      age: byTestId(
        "infos-contrat-salarie-convention-collective-commerce-gros-et-detail-alimentation-indemnite-de-licenciement-categorie-professionnelle-licenciement-economique-age"
      ),
      ruptureAge: byTestId(
        "infos-contrat-salarie-convention-collective-commerce-gros-et-detail-alimentation-rupture-conventionnelle-licenciement-economique-age"
      ),
    },
  },
  seniority: {
    startDate: byTestId("date-entree"),
    notificationDate: byTestId("date-notification"),
    endDate: byTestId("date-sortie"),
    hasAbsence: {
      oui: byTestId("hasAbsenceProlonge-Oui"),
      non: byTestId("hasAbsenceProlonge-Non"),
    },
    absences: {
      motifs: byTestId(/absence-motif-[0-9]/),
      motif: (index: number) => byTestId(`absence-motif-${index}`),
      duration: (index: number) => byTestId(`absence-duree-${index}`),
      date: (index: number) => byTestId(`absence-date-${index}`),
    },
    error: {
      requiredDate: byText(/Veuillez saisir cette date/),
    },
  },
  salary: {
    hasPartialTime: {
      oui: byTestId("hasTempsPartiel-Oui"),
      non: byTestId("hasTempsPartiel-Non"),
    },
    hasSameSalary: {
      oui: byTestId("hasSameSalary-Oui"),
      non: byTestId("hasSameSalary-Non"),
    },
    sameSalaryValue: byTestId("same-salary-value"),
    variablePart: {
      oui: byTestId("hasVariablePay-Oui"),
      non: byTestId("hasVariablePay-Non"),
    },
    salaries: byTestId("salary-input"),
    primes: byTestId("prime-input"),
    agreement44: {
      knowingLastSalary: {
        oui: byTestId("knowingLastSalary-Oui"),
        non: byTestId("knowingLastSalary-Non"),
      },
      salaries: byTestId("last-month-salary"),
      primes: byTestId("prime-last-month-salary"),
    },
    agreement29: {
      hasSiwMonthBestSalary: {
        oui: byTestId("hasSixBestSalaries-Oui"),
        non: byTestId("hasSixBestSalaries-Non"),
      },
    },
    agreementWithNoticeSalary: {
      knowingLastSalary: {
        oui: byTestId("hasReceivedSalaries-Oui"),
        non: byTestId("hasReceivedSalaries-Non"),
      },
      salaries: byTestId("notice-salary"),
      primes: byTestId("prime-notice-salary"),
    },
    agreement1517: {
      hasContractSalary: {
        oui: byTestId("hasContractSalary-Oui"),
        non: byTestId("hasContractSalary-Non"),
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
      ruptureTitle: byText(
        "Il n'y a pas d'indemnité de rupture conventionnelle dans cette situation"
      ),
      cddLicenciement: byText(
        /L’indemnité de licenciement ne concerne pas les salariés en CDD et en contrat de travail temporaire/
      ),
      cddRupture: byText(
        /La rupture conventionnelle ne concerne pas les salariés en CDD ou en contrat d'intérim/
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
    salaryTableRows: byTestId("table-salary-row"),
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
    sources: byTestId("source-", { exact: false }),
    source: (index: number) => byTestId(`source-${index}`),
    notifications: byTestId("notification-", { exact: false }),
    notification: (index: number) => byTestId(`notification-${index}`),
  },
  next: byText("Suivant"),
  previous: byText("Précédent"),
  activeStep: byTestId("stepper"),
  warning: byText("Attention"),
};
