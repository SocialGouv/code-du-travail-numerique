import { AncienneteStoreError, AncienneteStoreInput } from "../types";
import { parse } from "../../../../../common/utils";

export const getDateEntreeErrors = (
  state: AncienneteStoreInput
): Partial<AncienneteStoreError> => {
  let errors: AncienneteStoreError = {};

  // Date d'entrée
  if (!state.dateEntree) {
    errors.errorDateEntree = "Veuillez saisir cette date";
    return errors;
  }
  const dEntree = parse(state.dateEntree);
  if (dEntree.getFullYear().toString().length !== 4) {
    errors.errorDateEntree = "La date de début de contrat est invalide";
  } else {
    errors.errorDateEntree = undefined;
  }

  return errors;
};
