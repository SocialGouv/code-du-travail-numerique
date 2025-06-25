import { InformationsStoreInput, InformationsStoreError } from "./types";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { CONTRACT_TYPE } from "../../../types";

export const validateStep = (
  input: InformationsStoreInput,
  agreement?: Agreement
): { isValid: boolean; errorState: InformationsStoreError } => {
  const errorState: InformationsStoreError = {};
  let isValid = true;

  // Si pas de convention collective, l'étape est valide par défaut
  if (!agreement) {
    return { isValid: true, errorState: {} };
  }

  // Vérifier si un type de contrat est sélectionné
  if (!input.contractType) {
    errorState.contractType = "Veuillez sélectionner un type de contrat";
    isValid = false;
  }

  // Validation spécifique selon le type de contrat
  if (input.contractType) {
    if (input.contractType === CONTRACT_TYPE.CDD) {
      // Validation pour CDD
      if (!input.criteria?.cddType) {
        errorState.criteria = {
          cddType: "Veuillez sélectionner un type de CDD",
        };
        isValid = false;
      }
    }
    // Pour CTT (intérim), pas de validation spécifique pour l'instant
  }

  return { isValid, errorState };
};
