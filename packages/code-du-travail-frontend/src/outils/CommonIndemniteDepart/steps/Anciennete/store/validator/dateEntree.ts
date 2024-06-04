import { AncienneteStoreError, AncienneteStoreInput } from "../types";

export const getDateEntreeErrors = (
  state: AncienneteStoreInput
): Partial<AncienneteStoreError> => {
  let errors: AncienneteStoreError = {};

  // Date d'entrée
  if (!state.dateEntree) {
    errors.errorDateEntree = "Veuillez saisir cette date";
  } else {
    errors.errorDateEntree = undefined;
  }

  return errors;
};
