import { formatNumberAsString } from "./common";

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: number | undefined,
  seniority: number,
  salaireRef: number,
  salaireAgreementRef: number | undefined,
  inaptitude: boolean
): Record<string, string> => {
  const agreement: Record<string, string> = ccn
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn
          .toString()
          .padStart(4, "0")}'`,
      }
    : { "contrat salarié - convention collective": "''" };

  // paramétrer la bonne cc
  const agreementRefSalary: Record<string, string> = salaireAgreementRef
    ? {
        "contrat salarié - convention collective - batiment ouvriers employés - indemnité de licenciement - salaire de référence":
          formatNumberAsString(salaireAgreementRef),
      }
    : {};

  return {
    ...agreement,
    ...agreementRefSalary,
    ...{
      "contrat salarié - ancienneté en année": formatNumberAsString(seniority),
      "contrat salarié - salaire de référence":
        formatNumberAsString(salaireRef),
      "contrat salarié . ancienneté en année": formatNumberAsString(seniority),
      "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
        inaptitude ? "oui" : "non",
      "indemnité de licenciement": "oui",
    },
  };
};
