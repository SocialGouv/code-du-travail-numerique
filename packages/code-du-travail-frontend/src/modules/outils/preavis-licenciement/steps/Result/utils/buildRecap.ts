import { LicenciementSituation, Agreement } from "./types";

type ConventionCollective = {
  selected?: Agreement;
};

export const buildRecap = (
  disabledWorker: boolean | undefined,
  seriousMisconduct: unknown,
  legalSituation?: LicenciementSituation,
  agreementSituation?: LicenciementSituation,
  ccn?: ConventionCollective
): Record<string, string> => {
  const defaultRecap = {
    "Licenciement pour faute grave": seriousMisconduct ? "Oui" : "Non",
    "Reconnu en tant que travailleur handicapé": disabledWorker ? "Oui" : "Non",
  };

  let legalRecap = {};
  if (legalSituation) {
    const {
      criteria: { ancienneté: seniorityCDT, ...situationCDTCriteria },
      duration: durationCDT,
    } = legalSituation;
    legalRecap = {
      "Ancienneté selon le code du travail": seniorityCDT,
      ...situationCDTCriteria,
    };
  }
  let agreementRecap = {};
  if (agreementSituation) {
    const {
      criteria: { ancienneté: seniorityCC, ...situationCCCriteria },
      duration: durationCC,
    } = agreementSituation;
    agreementRecap = {
      ...situationCCCriteria,
      ...(seniorityCC && {
        "Ancienneté selon la convention collective": seniorityCC,
      }),
      ...(ccn?.selected && {
        "Convention collective": ccn.selected.shortTitle,
      }),
    };
  }

  return {
    ...legalRecap,
    ...defaultRecap,
    ...agreementRecap,
    ...(ccn?.selected && {
      "Convention collective": ccn.selected.shortTitle,
    }),
  };
};
