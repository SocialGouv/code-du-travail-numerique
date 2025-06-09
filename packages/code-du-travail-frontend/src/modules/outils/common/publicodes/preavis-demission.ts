import { formatIdcc } from "@socialgouv/modeles-social";

export const mapToPublicodesSituationForCalculationPreavisDemission = (
  ccn?: number,
  moreInfos?: Record<string, string>
): Record<string, string | undefined> => {
  return {
    "contrat salarié . convention collective": ccn
      ? `'IDCC${formatIdcc(ccn)}'`
      : "''",
    ...moreInfos,
  };
};
