import { formatIdcc, SalaryPeriods } from "@socialgouv/modeles-social";

export const mapToPublicodesSituationForCalculation = (
  startDate: string,
  notificationDate: string,
  endDate: string,
  salaryPeriods: SalaryPeriods[],
  inaptitude: boolean,
  longTermDisability: boolean
): Record<string, string> => {
  return {
    salaryPeriods: JSON.stringify(salaryPeriods),
    "contrat salarié . indemnité de licenciement . date d'entrée": startDate,
    "contrat salarié . indemnité de licenciement . date de notification":
      notificationDate,
    "contrat salarié . indemnité de licenciement . date de sortie": endDate,
    "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
      inaptitude ? "oui" : "non",
    "contrat salarié . indemnité de licenciement . arrêt de travail":
      longTermDisability ? "oui" : "non",
  };
};

export const mapToPublicodesSituationForIndemniteLicenciementConventionnel = (
  ccn: number,
  inaptitude: boolean,
  longTermDisability: boolean,
  agreementParameters?: Record<string, any>
): Record<string, string> => {
  return {
    ...agreementParameters,
    ...{
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        inaptitude ? "oui" : "non",
      "contrat salarié . indemnité de licenciement . arrêt de travail":
        longTermDisability ? "oui" : "non",
      "contrat salarié . convention collective": `'IDCC${formatIdcc(ccn)}'`,
    },
  };
};

export const mapToPublicodesSituationForIndemniteLicenciementConventionnelWithValues =
  (
    ccn: number | undefined,
    salaryPeriods: SalaryPeriods[],
    notificationDate: string,
    startDate: string,
    endDate: string,
    inaptitude: boolean,
    longTermDisability: boolean,
    agreementParameters?: Record<string, any>
  ): Record<string, string> => {
    return ccn ? mapToPublicodesSituationForIndemniteLicenciementConventionnel(
      ccn,
      inaptitude,
      longTermDisability,
      {
        ...agreementParameters,
        ...{
          salaryPeriods: JSON.stringify(salaryPeriods),
          "contrat salarié . indemnité de licenciement . date de notification":
            notificationDate,
          "contrat salarié . indemnité de licenciement . date d'entrée":
          startDate,
          "contrat salarié . indemnité de licenciement . date de sortie":
            endDate,
        },
      }
    ) : mapToPublicodesSituationForCalculation(startDate, notificationDate, endDate, salaryPeriods, inaptitude, longTermDisability);
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
