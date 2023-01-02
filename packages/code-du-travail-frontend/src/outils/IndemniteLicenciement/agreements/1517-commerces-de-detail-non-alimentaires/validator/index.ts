import { Agreement } from "../../../../../conventions/Search/api/type";
import { deepEqualObject } from "../../../../../lib";
import { CommonInformationsStoreInput } from "../../../../CommonSteps/Informations/store";
import {
  AncienneteStoreInput,
  AncienneteStoreError,
} from "../../../steps/Anciennete/store";
import { getAbsencePeriodsErrors } from "../../../steps/Anciennete/store/validator/absencePeriods";
import { getAbsenceProlongeErrors } from "../../../steps/Anciennete/store/validator/absenceProlonge";
import { getDateEntreeErrors } from "../../../steps/Anciennete/store/validator/dateEntree";
import { getDateSortieErrors } from "./dateSortie";

export const validateStep = (
  state: AncienneteStoreInput,
  information: CommonInformationsStoreInput,
  agreeement: Agreement
) => {
  const errors: AncienneteStoreError = {
    ...getDateEntreeErrors(state),
    ...getDateSortieErrors(state, agreeement),
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
