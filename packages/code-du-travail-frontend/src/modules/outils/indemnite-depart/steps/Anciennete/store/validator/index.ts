import { AncienneteStoreError, AncienneteStoreInput } from "../types";
import { CommonInformationsStoreInput } from "../../../Informations/store";

import { getDateEntreeErrors } from "./dateEntree";
import { getDateSortieErrors } from "./dateSortie";
import { getDateNotificationErrors } from "./dateNotification";
import { getAbsencePeriodsErrors } from "./absencePeriods";
import { getAbsenceProlongeErrors } from "./absenceProlonge";
import { getDateArretTravailErrors } from "./dateArretTravail";
import { ContratTravailStoreInput } from "../../../ContratTravail/store";
import { deepEqualObject } from "src/lib";

export const validateStep = (
  state: AncienneteStoreInput,
  stateContratTravail: ContratTravailStoreInput,
  information?: CommonInformationsStoreInput
) => {
  const errors: AncienneteStoreError = {
    ...getDateEntreeErrors(state),
    ...getDateSortieErrors(state),
    ...getDateNotificationErrors(state),
    ...getAbsencePeriodsErrors(state, information),
    ...getAbsenceProlongeErrors(state),
    ...getDateArretTravailErrors(state, stateContratTravail),
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
