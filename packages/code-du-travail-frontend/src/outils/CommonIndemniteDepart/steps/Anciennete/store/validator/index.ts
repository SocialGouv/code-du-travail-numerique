import { deepEqualObject } from "../../../../../../lib";
import {
  AncienneteStoreConfig,
  AncienneteStoreError,
  AncienneteStoreInput,
} from "../types";
import { CommonInformationsStoreInput } from "../../../../../CommonSteps/Informations/store";

import { getDateEntreeErrors } from "./dateEntree";
import { getDateSortieErrors } from "./dateSortie";
import { getDateNotificationErrors } from "./dateNotification";
import { getAbsencePeriodsErrors } from "./absencePeriods";
import { getAbsenceProlongeErrors } from "./absenceProlonge";
import { getDateArretTravailErrors } from "./dateArretTravail";
import { ContratTravailStoreInput } from "../../../ContratTravail/store";

export const validateStep = (
  state: AncienneteStoreInput,
  config: AncienneteStoreConfig,
  stateContratTravail: ContratTravailStoreInput,
  information?: CommonInformationsStoreInput
) => {
  const dateNotificationsErrors = config.showNotificationDate
    ? getDateNotificationErrors(state)
    : { errorDateNotification: undefined };
  const errors: AncienneteStoreError = {
    ...getDateEntreeErrors(state),
    ...getDateSortieErrors(state),
    ...dateNotificationsErrors,
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
