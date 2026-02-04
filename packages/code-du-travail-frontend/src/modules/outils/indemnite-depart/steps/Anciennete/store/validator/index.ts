import { AncienneteStoreError, AncienneteStoreInput } from "../types";
import { CommonInformationsStoreInput } from "../../../Informations/store";

import { getDateEntreeErrors } from "./dateEntree";
import { getDateSortieErrors } from "./dateSortie";
import { getDateNotificationErrors } from "./dateNotification";
import { getAbsencePeriodsErrors } from "./absencePeriods";
import { getAbsenceProlongeErrors } from "./absenceProlonge";
import { getDateArretTravailErrors } from "./dateArretTravail";
import { deepEqualObject } from "src/modules/utils/object";

export const validateStep = (
  state: AncienneteStoreInput,
  information?: CommonInformationsStoreInput
) => {
  let errors: AncienneteStoreError = {
    ...getDateEntreeErrors(state),
    ...getDateSortieErrors(state),
    ...getDateNotificationErrors(state),
    ...getAbsencePeriodsErrors(state, information),
    ...getAbsenceProlongeErrors(state),
    ...getDateArretTravailErrors(state),
  };

  return {
    isValid: deepEqualObject(errors, {
      errorAbsenceProlonge: undefined,
      errorDateSortie: undefined,
      errorDateNotification: undefined,
      errorDateEntree: undefined,
      errorAbsencePeriods: undefined,
      errorArretTravail: undefined,
      errorDateArretTravail: undefined,
    }),
    errorState: errors,
  };
};
