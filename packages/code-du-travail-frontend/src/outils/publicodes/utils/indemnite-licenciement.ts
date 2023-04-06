import { formatNumberAsString } from "./common";
import { formatIdcc, SeniorityResult } from "@socialgouv/modeles-social";

export const mapToPublicodesSituationForIndemniteLicenciementLegal = (
  seniority: number,
  requiredSeniority: number,
  salaireRef: number,
  inaptitude: boolean
): Record<string, string> => {
  return {
    "contrat salarié . indemnité de licenciement . salaire de référence":
      formatNumberAsString(salaireRef),
    "contrat salarié . indemnité de licenciement . ancienneté en année":
      formatNumberAsString(seniority),
    "contrat salarié . indemnité de licenciement . ancienneté requise en année":
      formatNumberAsString(requiredSeniority),
    "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
      inaptitude ? "oui" : "non",
  };
};

export const mapToPublicodesSituationForIndemniteLicenciementConventionnel = (
  ccn: number,
  agreementParameters?: Record<string, any>
): Record<string, string> => {
  return {
    ...agreementParameters,
    ...{
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . convention collective": `'IDCC${formatIdcc(ccn)}'`,
    },
  };
};

export const mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues =
  (
    ccn: number,
    agreementSeniority: SeniorityResult,
    agreementSalaireRef: number,
    requiredSeniority: number,
    notificationDate: string,
    agreementParameters?: Record<string, any>
  ): Record<string, string> => {
    return mapToPublicodesSituationForIndemniteLicenciementConventionnel(ccn, {
      ...agreementParameters,
      ...(agreementSeniority?.extraInfos ?? {}),
      ...{
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          formatNumberAsString(agreementSeniority.value),
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          formatNumberAsString(agreementSalaireRef),
        "contrat salarié . indemnité de licenciement . date de notification":
          notificationDate,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          requiredSeniority,
      },
    });
  };

export const publicodesUnitTranslator = (value: string, unit?: string) => {
  if (!unit) return "";
  if (unit === "an") {
    const parseValue = parseFloat(value);
    if (parseValue <= 1) {
      return "an";
    }
    return "ans";
  }
  return unit;
};
