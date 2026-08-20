import { ContractOption } from "../../../types";
import { TypeContratStoreError } from "./types";

/**
 * L'option est résolue depuis la convention collective courante : un
 * identifiant qui ne correspond à aucune option proposée (par exemple après
 * un changement de convention) doit être traité comme une absence de saisie.
 */
export const validateStep = (
  contractOption?: ContractOption
): { isValid: boolean; errorState: TypeContratStoreError } => {
  const errorState: TypeContratStoreError = {
    contractOptionId: contractOption
      ? undefined
      : "Veuillez sélectionner un type de contrat",
  };

  return {
    isValid: !Object.values(errorState).some((error) => !!error),
    errorState,
  };
};
