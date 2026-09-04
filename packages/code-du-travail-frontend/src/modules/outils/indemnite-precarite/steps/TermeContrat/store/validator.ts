import { TermeContratStoreError, TermeContratStoreInput } from "./types";

export const validateStep = (
  input: TermeContratStoreInput
): { isValid: boolean; errorState: TermeContratStoreError } => {
  const errorState: TermeContratStoreError = {
    finALaDatePrevue: input.finALaDatePrevue
      ? undefined
      : "Veuillez répondre à cette question",
    issueContrat:
      !input.finALaDatePrevue || input.issueContrat
        ? undefined
        : "Veuillez sélectionner l'issue du contrat",
  };

  return {
    isValid: !Object.values(errorState).some((error) => !!error),
    errorState,
  };
};
