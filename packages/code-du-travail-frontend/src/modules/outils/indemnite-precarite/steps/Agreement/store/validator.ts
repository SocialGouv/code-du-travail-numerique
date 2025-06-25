import { AgreementStoreInput, AgreementStoreError } from "./types";

export const validateStep = (
  input: AgreementStoreInput
): { isValid: boolean; errorState: AgreementStoreError } => {
  const errorState: AgreementStoreError = {};
  let isValid = true;

  // Validation de l'accord
  if (!input.agreement) {
    errorState.agreement = "Veuillez sélectionner une convention collective";
    isValid = false;
  }

  // Validation de l'entreprise si nécessaire
  if (input.agreement && !input.enterprise && !input.hasNoEnterpriseSelected) {
    errorState.enterprise =
      "Veuillez sélectionner une entreprise ou indiquer qu'aucune entreprise n'a été trouvée";
    isValid = false;
  }

  return { isValid, errorState };
};
