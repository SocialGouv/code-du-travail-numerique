import { formatNumberAsString } from "./common";
import { SeniorityResult } from "@socialgouv/modeles-social";

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
  };
};

export const mapToPublicodesSituationForIndemniteLicenciementConventionnel = (
  ccn: number,
  agreementSeniority: SeniorityResult,
  agreementSalaireRef: number,
  legalSeniority: SeniorityResult,
  legalSalaireRef: number,
  agreementParameters?: Record<string, any>
): Record<string, string> => {
  return {
    ...agreementParameters,
    ...(agreementSeniority?.extraInfos ?? {}),
    ...{
      "contrat salarié . convention collective": `'IDCC${ccn
        .toString()
        .padStart(4, "0")}'`,
      "contrat salarié . indemnité de licenciement . salaire de référence":
        formatNumberAsString(legalSalaireRef),
      "contrat salarié . indemnité de licenciement . ancienneté en année":
        formatNumberAsString(legalSeniority.value),
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        formatNumberAsString(agreementSeniority.value),
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        formatNumberAsString(agreementSalaireRef),
    },
  };
};
