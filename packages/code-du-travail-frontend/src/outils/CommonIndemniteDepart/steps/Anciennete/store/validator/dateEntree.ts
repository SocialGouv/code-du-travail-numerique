import { AncienneteStoreError, AncienneteStoreInput } from "../types";
import { isBefore } from "date-fns";
import { parse } from "../../../../../common/utils";

const BEGINNING = new Date("01-01-1900");

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
  if (isBefore(dEntree, BEGINNING)) {
    errors.errorDateEntree = "La date de début de contrat est invalide";
  } else {
    errors.errorDateEntree = undefined;
  }

  return errors;
};
