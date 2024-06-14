import { AncienneteStoreError, AncienneteStoreInput } from "../types";
import { isAfter, isBefore } from "date-fns";
import { parse } from "../../../../../common/utils";

const BEGINNING = new Date("01-01-1900");
const today = new Date();
const END_IN_50_YEARS = today.setFullYear(today.getFullYear() + 50);

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
