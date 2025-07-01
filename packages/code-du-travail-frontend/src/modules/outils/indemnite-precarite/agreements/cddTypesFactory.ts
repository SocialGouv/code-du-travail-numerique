import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { EXCLUDED_CONTRACTS } from "../steps/Informations/store/validator";

export const CDD_TYPES = {
  INTERVENTION_FOIRES_SALONS:
    "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès",
  ENQUETEURS_VACATAIRES: "Enquêteurs vacataires",
  USAGE_1516: "CDD d'usage",
  OPTIMISATION_LINEAIRE: "CDD d'optimisation linéaire",
  ANIMATION_COMMERCIALE: "CDD d'animation commerciale",
  INTERVENTION_ACCUEIL_EVENEMENTIEL:
    "Contrat d'intervention dans le secteur de l'accueil événementiel",
  USAGE_INTERVENTION_2511: "CDD d'usage appelé contrat «d'intervention»",
  MISSION_PONCTUELLE: "CDD dit de « mission ponctuelle ou occasionnelle »",
  AUTRES: "Autres",
} as const;

export function getCddTypesForAgreement(agreement?: Agreement): string[] {
  const specificTypes: string[] = [];

  if (!agreement) {
    return [...EXCLUDED_CONTRACTS, CDD_TYPES.AUTRES];
  }

  switch (agreement.num) {
    case 1486:
      specificTypes.push(
        CDD_TYPES.INTERVENTION_FOIRES_SALONS,
        CDD_TYPES.ENQUETEURS_VACATAIRES
      );
      break;
    case 1516:
      specificTypes.push(CDD_TYPES.USAGE_1516);
      break;

    case 2098:
      specificTypes.push(
        CDD_TYPES.OPTIMISATION_LINEAIRE,
        CDD_TYPES.ANIMATION_COMMERCIALE,
        CDD_TYPES.INTERVENTION_ACCUEIL_EVENEMENTIEL
      );
      break;
    case 2511:
      specificTypes.push(CDD_TYPES.USAGE_INTERVENTION_2511);
      break;
    case 3127:
      specificTypes.push(CDD_TYPES.MISSION_PONCTUELLE);
      break;
    default:
      break;
  }

  return [CDD_TYPES.AUTRES, ...specificTypes, ...EXCLUDED_CONTRACTS];
}
