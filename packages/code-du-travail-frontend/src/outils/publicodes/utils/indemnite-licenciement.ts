import { formatNumberAsString } from "./common";

export const mapToPublicodesSituationForIndemniteLicenciementLegal = (
  seniority: number,
  salaireRef: number,
  inaptitude: boolean
): Record<string, string> => {
  return {
    "contrat salarié . indemnité de licenciement . salaire de référence":
      formatNumberAsString(salaireRef),
    "contrat salarié . indemnité de licenciement . ancienneté en année":
      formatNumberAsString(seniority),
    "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
      inaptitude ? "oui" : "non",
    "indemnité de licenciement": "oui",
  };
};

export const mapToPublicodesSituationForIndemniteLicenciementConventionnel = (
  ccn: number,
  agreementSeniority: number,
  agreementSalaireRef: number,
  legalSeniority: number,
  legalSalaireRef: number,
  notificationDate: string,
  agreementParameters?: Record<string, any>
): Record<string, string> => {
  return {
    ...agreementParameters,
    ...{
      "contrat salarié . convention collective": `'IDCC${ccn
        .toString()
        .padStart(4, "0")}'`,
      "contrat salarié . indemnité de licenciement . salaire de référence":
        formatNumberAsString(legalSalaireRef),
      "contrat salarié . indemnité de licenciement . ancienneté en année":
        formatNumberAsString(legalSeniority),
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        formatNumberAsString(agreementSeniority),
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        formatNumberAsString(agreementSalaireRef),
      "indemnité de licenciement": "oui",
      "contrat salarié . indemnité de licenciement . date de notification": notificationDate
    },
  };
};
