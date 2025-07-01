import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { EXCLUDED_CONTRACTS } from "../steps/Informations/store/validator";

export function getCddTypesForAgreement(agreement?: Agreement): string[] {
  const specificTypes: string[] = [];

  if (!agreement) {
    return [...EXCLUDED_CONTRACTS, "Autres"];
  }

  switch (agreement.num) {
    case 3127:
      specificTypes.push("CDD dit de « mission ponctuelle ou occasionnelle »");
      break;

    case 1486:
      specificTypes.push(
        "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès"
      );
      break;

    case 2511:
      specificTypes.push("CDD d'usage appelé contrat «d'intervention»");
      break;

    case 1516:
      specificTypes.push("CDD d'usage");
      break;

    case 2098:
      specificTypes.push(
        "CDD d'optimisation linéaire",
        "CDD d'animation commerciale",
        "Contrat d'intervention dans le secteur de l'accueil événementiel"
      );
      break;

    default:
      break;
  }

  return [...EXCLUDED_CONTRACTS, ...specificTypes, "Autres"];
}
