import { isValidDate } from "../../../../../../lib";
import { AncienneteStoreError, AncienneteStoreInput } from "../types";

export const getDateEntreeErrors = (
  state: AncienneteStoreInput
): Partial<AncienneteStoreError> => {
  let errors: AncienneteStoreError = {};

  console.log(`La date d'entrée est ${state.dateEntree}`);

  // Date d'entrée
  if (!state.dateEntree) {
    errors.errorDateEntree = "Veuillez saisir cette date";
  } else if (!isValidDate(state.dateEntree)) {
    errors.errorDateEntree = "La date de début de contrat est invalide";
  } else {
    errors.errorDateEntree = undefined;
  }

  return errors;
};
