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
  seniority: number,
  salaireRef: number,
  agreementParameters?: Record<string, any>
): Record<string, string> => {
  return {
    ...agreementParameters,
    ...{
      "contrat salarié . convention collective": `'IDCC${ccn
        .toString()
        .padStart(4, "0")}'`,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
        formatNumberAsString(seniority),
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        formatNumberAsString(salaireRef),
      "indemnité de licenciement": "oui",
    },
  };
};
