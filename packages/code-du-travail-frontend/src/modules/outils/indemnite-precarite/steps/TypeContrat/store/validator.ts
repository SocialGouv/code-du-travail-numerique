import { TypeContratStoreError, TypeContratStoreInput } from "./types";

export const validateStep = (
  input: TypeContratStoreInput
): { isValid: boolean; errorState: TypeContratStoreError } => {
  const errorState: TypeContratStoreError = {
    contractOptionId: input.contractOptionId
      ? undefined
      : "Veuillez sélectionner un type de contrat",
  };

  return {
    isValid: !Object.values(errorState).some((error) => !!error),
    errorState,
  };
};
