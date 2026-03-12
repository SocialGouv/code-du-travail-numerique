import { AncienneteStoreError, AncienneteStoreInput } from "../types";

import { getDateEntreeErrors } from "./dateEntree";
import { getDateSortieErrors } from "./dateSortie";
import { getDateNotificationErrors } from "./dateNotification";
import { deepEqualObject } from "src/modules/utils/object";

export const validateStep = (state: AncienneteStoreInput) => {
  const errors: AncienneteStoreError = {
    ...getDateEntreeErrors(state),
    ...getDateSortieErrors(state),
    ...getDateNotificationErrors(state),
  };

  return {
    isValid: deepEqualObject(errors, {
      errorDateSortie: undefined,
      errorDateNotification: undefined,
      errorDateEntree: undefined,
    }),
    errorState: errors,
  };
};
