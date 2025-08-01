import { formatIdcc } from "@socialgouv/modeles-social";

export const mapToPublicodesSituationForCalculationPreavisLicenciement = (
  seniority: string,
  isHandicappedWorker: boolean,
  ccn?: number,
  moreInfos?: Record<string, string>
): Record<string, string | undefined> => {
  return {
    "contrat salarié . convention collective . ancienneté légal": seniority,
    "contrat salarié . convention collective": ccn
      ? `'IDCC${formatIdcc(ccn)}'`
      : "''",
    ...(isHandicappedWorker && {
      "contrat salarié . travailleur handicapé": "oui",
    }),
    ...moreInfos,
  };
};
