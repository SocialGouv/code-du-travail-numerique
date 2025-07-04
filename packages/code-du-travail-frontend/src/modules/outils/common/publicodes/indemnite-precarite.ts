import { formatIdcc } from "@socialgouv/modeles-social";
import { InformationsStoreInput } from "../../indemnite-precarite/steps/Informations/store/types";
import { CDD_TYPES } from "../../indemnite-precarite/agreements";

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

export const mapAgreementSpecificParametersToPublicodes = (
  informationsInput: InformationsStoreInput,
  ccn?: number
): Record<string, string | undefined> => {
  const additionalFields: Record<string, string | undefined> = {};

  if (!ccn || !informationsInput.criteria?.cddType) {
    return additionalFields;
  }

  const cddType = informationsInput.criteria.cddType;

  switch (ccn) {
    case 1486: // Bureaux études techniques
      if (cddType === CDD_TYPES.INTERVENTION_FOIRES_SALONS) {
        additionalFields["contrat salarié . avec proposition cdi"] =
          informationsInput.hasCdiProposal === "oui" ? "'oui'" : "'non'";
      }
      break;

    case 1516: // Organismes formation
      if (cddType === CDD_TYPES.USAGE_1516) {
        additionalFields["contrat salarié . embauché en cdi"] =
          informationsInput.hasCdiRenewal === "oui" ? "'oui'" : "'non'";
      }
      break;

    case 2098: // Personnel presta service tertiaire
      // Pas de paramètres spécifiques pour cette CC
      break;

    case 2511: // Sport
      if (cddType === CDD_TYPES.USAGE_INTERVENTION_2511) {
        additionalFields["contrat salarié . embauché en cdi"] =
          informationsInput.hasCdiRenewal === "oui" ? "'oui'" : "'non'";
      }
      break;

    case 3127: // Entreprises services à la personne
      if (cddType === CDD_TYPES.MISSION_PONCTUELLE) {
        additionalFields[
          "contrat salarié . embauché en cdi sans interruption"
        ] =
          informationsInput.hasEquivalentCdiRenewal === "oui"
            ? "'oui'"
            : "'non'";
      }
      break;

    default:
      break;
  }

  return additionalFields;
};
