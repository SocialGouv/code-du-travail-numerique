import { AgreementStoreInput, AgreementStoreError } from "./types";

export const validateAgreementStep = (
  input: AgreementStoreInput
): AgreementStoreError => {
  const errors: AgreementStoreError = {};

  if (!input.route) {
    errors.route = "Veuillez sélectionner une option";
  }

  if (input.route === "agreement" && !input.agreement) {
    errors.agreement = "Veuillez sélectionner une convention collective";
  }

  if (input.route === "enterprise" && !input.enterprise) {
    errors.enterprise = "Veuillez sélectionner une entreprise";
  }

  return errors;
};
