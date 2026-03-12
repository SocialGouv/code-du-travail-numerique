import { AbsenceStoreError, AbsenceStoreInput } from "../types";

export const getAbsenceProlongeErrors = (
  state: AbsenceStoreInput
): Partial<AbsenceStoreError> => {
  let errors: AbsenceStoreError = {};

  if (state.hasAbsenceProlonge === undefined) {
    errors.errorAbsenceProlonge = "Vous devez répondre à cette question";
  } else {
    errors.errorAbsenceProlonge = undefined;
  }

  return errors;
};
