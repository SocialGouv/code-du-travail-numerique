import { AbsenceStoreError, AbsenceStoreInput } from "../types";
import { CommonInformationsStoreInput } from "../../../Informations/store";
import { getAbsencePeriodsErrors } from "./absencePeriods";
import { getAbsenceProlongeErrors } from "./absenceProlonge";
import { getDateArretTravailErrors } from "./dateArretTravail";
import { deepEqualObject } from "src/modules/utils/object";
import { AncienneteStoreInput } from "../../../Anciennete";

export const validateStep = (
  state: AbsenceStoreInput,
  ancienneteState: AncienneteStoreInput,
  information?: CommonInformationsStoreInput
) => {
  const errors: AbsenceStoreError = {
    ...getAbsencePeriodsErrors(state, ancienneteState, information),
    ...getAbsenceProlongeErrors(state),
    ...getDateArretTravailErrors(state, ancienneteState),
  };

  return {
    isValid: deepEqualObject(errors, {
      errorAbsenceProlonge: undefined,
      errorAbsencePeriods: undefined,
      errorArretTravail: undefined,
      errorDateArretTravail: undefined,
    }),
    errorState: errors,
  };
};
