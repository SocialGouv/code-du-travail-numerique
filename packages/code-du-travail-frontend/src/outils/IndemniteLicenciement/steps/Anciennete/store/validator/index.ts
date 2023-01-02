import { deepEqualObject, isValidDate } from "../../../../../../lib";
import { AncienneteStoreError, AncienneteStoreInput } from "../types";
import { CommonInformationsStoreInput } from "../../../../../CommonSteps/Informations/store";

import { getDateEntreeErrors } from "./dateEntree";
import { getDateSortieErrors } from "./dateSortie";
import { getDateNotificationErrors } from "./dateNotification";
import { getAbsencePeriodsErrors } from "./absencePeriods";
import { getAbsenceProlongeErrors } from "./absenceProlonge";

export const validateStep = (
  state: AncienneteStoreInput,
  information: CommonInformationsStoreInput
) => {
  const errors: AncienneteStoreError = {
    ...getDateEntreeErrors(state),
    ...getDateSortieErrors(state),
    ...getDateNotificationErrors(state),
    ...getAbsencePeriodsErrors(state, information),
    ...getAbsenceProlongeErrors(state),
  };

  return {
    isValid: deepEqualObject(errors, {
      errorAbsenceProlonge: undefined,
      errorDateSortie: undefined,
      errorDateNotification: undefined,
      errorDateEntree: undefined,
      errorAbsencePeriods: undefined,
    }),
    errorState: errors,
  };
};
