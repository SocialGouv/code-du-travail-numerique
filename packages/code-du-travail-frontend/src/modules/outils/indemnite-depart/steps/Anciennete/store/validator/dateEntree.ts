import { isAfter, isBefore, isValid } from "date-fns";
import { AncienneteStoreError, AncienneteStoreInput } from "../types";
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
  if (
    !isValid(dEntree) ||
    isBefore(dEntree, BEGINNING) ||
    isAfter(dEntree, END_IN_50_YEARS)
  ) {
    errors.errorDateEntree = "La date de début de contrat est invalide";
  } else {
    errors.errorDateEntree = undefined;
  }

  return errors;
};
