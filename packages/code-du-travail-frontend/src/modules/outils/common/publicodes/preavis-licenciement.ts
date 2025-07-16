import { formatIdcc } from "@socialgouv/modeles-social";

export const mapToPublicodesSituationForCalculationPreavisLicenciement = (
  seniority: string,
  ccn?: number,
  moreInfos?: Record<string, string>
): Record<string, string | undefined> => {
  return {
    "contrat salarié . ancienneté": seniority,
    "contrat salarié . convention collective": ccn
      ? `'IDCC${formatIdcc(ccn)}'`
      : "''",
    ...moreInfos,
  };
};

export const commonMapToPublicodesSituationForCalculationPreavisLicenciement = (
  seniority: string,
  ccn?: number,
  moreInfos?: Record<string, string>
): Record<string, string | undefined> => {
  return mapToPublicodesSituationForCalculationPreavisLicenciement(
    seniority,
    ccn,
    moreInfos
  );
};
