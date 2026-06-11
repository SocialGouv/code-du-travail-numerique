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

const toPublicodesYesNo = (value: boolean | undefined): string =>
  value === true ? "'oui'" : "'non'";

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
          toPublicodesYesNo(informationsInput.hasCdiProposal);
      }
      break;

    case 1516: // Organismes formation
      if (cddType === CDD_TYPES.USAGE_1516) {
        additionalFields["contrat salarié . embauché en cdi"] =
          toPublicodesYesNo(informationsInput.hasCdiRenewal);
      }
      break;

    case 2098: // Personnel presta service tertiaire
      // Pas de paramètres spécifiques pour cette CC
      break;

    case 2511: // Sport
      if (cddType === CDD_TYPES.USAGE_INTERVENTION_2511) {
        additionalFields["contrat salarié . embauché en cdi"] =
          toPublicodesYesNo(informationsInput.hasCdiRenewal);
      }
      break;

    case 3127: // Entreprises services à la personne
      if (cddType === CDD_TYPES.MISSION_PONCTUELLE) {
        additionalFields[
          "contrat salarié . embauché en cdi sans interruption"
        ] = toPublicodesYesNo(informationsInput.hasEquivalentCdiRenewal);
      }
      break;

    default:
      break;
  }

  return additionalFields;
};
