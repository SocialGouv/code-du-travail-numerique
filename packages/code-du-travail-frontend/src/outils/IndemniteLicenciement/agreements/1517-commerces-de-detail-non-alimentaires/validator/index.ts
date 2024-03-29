import { deepEqualObject } from "../../../../../lib";
import { CommonInformationsStoreInput } from "../../../../CommonSteps/Informations/store";
import {
  AncienneteStoreInput,
  AncienneteStoreError,
} from "../../../steps/Anciennete/store";
import { getAbsencePeriodsErrors } from "../../../steps/Anciennete/store/validator/absencePeriods";
import { getAbsenceProlongeErrors } from "../../../steps/Anciennete/store/validator/absenceProlonge";
import { getDateArretTravailErrors } from "../../../steps/Anciennete/store/validator/dateArretTravail";
import { getDateEntreeErrors } from "../../../steps/Anciennete/store/validator/dateEntree";
import { ContratTravailStoreInput } from "../../../steps/ContratTravail/store";
import { getDateSortieErrors } from "./dateSortie";

export const validateStep = (
  state: AncienneteStoreInput,
  stateContratTravail: ContratTravailStoreInput,
  information: CommonInformationsStoreInput
) => {
  const errors: AncienneteStoreError = {
    ...getDateEntreeErrors(state),
    ...getDateSortieErrors(state),
    ...getAbsencePeriodsErrors(state, information),
    ...getAbsenceProlongeErrors(state),
    ...getDateArretTravailErrors(state, stateContratTravail),
  };

  return {
    isValid: deepEqualObject(errors, {
      errorAbsenceProlonge: undefined,
      errorDateSortie: undefined,
      errorDateEntree: undefined,
      errorAbsencePeriods: undefined,
    }),
    errorState: errors,
  };
};
