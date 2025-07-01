import { formatIdcc } from "@socialgouv/modeles-social";

export const mapToPublicodesSituationForCalculationIndemnitePrecarite = (
  salaireDeReference: number,
  additionalFields: Record<string, string | undefined>,
  ccn?: number
): Record<string, string | undefined> => {
  return {
    "contrat salarié . convention collective": ccn
      ? `'IDCC${formatIdcc(ccn)}'`
      : "''",
    "contrat salarié . salaire de référence": `${salaireDeReference}`,
    "contrat salarié . contractType": "'CDD'",
    "contrat salarié . finContratPeriodeDessai": "non",
    "contrat salarié . propositionCDIFindeContrat": "non",
    "contrat salarié . refusCDIFindeContrat": "non",
    "contrat salarié . interruptionFauteGrave": "non",
    "contrat salarié . refusRenouvellementAuto": "non",
    "contrat salarié . cttFormation": "non",
    "contrat salarié . ruptureContratFauteGrave": "non",
    "contrat salarié . propositionCDIFinContrat": "non",
    "contrat salarié . refusSouplesse": "non",
    ...additionalFields,
  };
};
