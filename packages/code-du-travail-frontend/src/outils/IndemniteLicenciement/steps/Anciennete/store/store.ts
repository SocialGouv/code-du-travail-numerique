import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import produce from "immer";
import { GetState, SetState } from "zustand";
import { IndemniteLicenciementStepName } from "../../..";
import { validateAgreement } from "../../../agreements";
import { computeSeniority } from "../../../common";
import { setSalaryPeriods } from "../../../common";
import { StoreSlice } from "../../../store";
import { SalairesStoreSlice } from "../../Salaires/store";

import {
  AncienneteStoreData,
  AncienneteStoreInput,
  AncienneteStoreSlice,
} from "./types";
import { validateStep } from "./validator";

const initialState: AncienneteStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {
    absencePeriods: [],
    seniority: 0,
  },
  error: {},
};

const createAncienneteStore: StoreSlice<
  AncienneteStoreSlice,
  SalairesStoreSlice
> = (set, get) => ({
  ancienneteData: { ...initialState },
  ancienneteFunction: {
    onChangeDateEntree: (value) => {
      applyGenericValidation(get, set, "dateEntree", value);
    },
    onChangeDateSortie: (value) => {
      applyGenericValidation(get, set, "dateSortie", value);
    },
    onChangeDateNotification: (value) => {
      applyGenericValidation(get, set, "dateNotification", value);
    },
    onChangeAbsencePeriods: (value) => {
      applyGenericValidation(get, set, "absencePeriods", value);
    },
    onChangeHasAbsenceProlonge: (value) => {
      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.input.absencePeriods =
            value === "non"
              ? initialState.input.absencePeriods
              : get().ancienneteData.input.absencePeriods;
        })
      );
      applyGenericValidation(get, set, "hasAbsenceProlonge", value);
    },
    onValidateStepAnciennete: () => {
      const { isValid, errorState } = validateStep(get().ancienneteData.input);

      let seniority = 0;

      if (isValid) {
        seniority = computeSeniority({
          dateSortie: get().ancienneteData.input.dateSortie!,
          dateEntree: get().ancienneteData.input.dateEntree!,
          absencePeriods: get().ancienneteData.input.absencePeriods!,
        });
      }

      const isAgreementValid = validateAgreement(
        SupportedCcIndemniteLicenciement.IDCC1516, //TODO: replace par la cc
        IndemniteLicenciementStepName.Anciennete,
        get,
        set
      );

      const isStepValid = isValid && isAgreementValid;

      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.hasBeenSubmit = isStepValid ? false : true;
          state.ancienneteData.isStepValid = isStepValid;
          state.ancienneteData.error = errorState;
          state.ancienneteData.input.seniority = seniority;
        })
      );

      setSalaryPeriods(get, set);

      return isStepValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<AncienneteStoreSlice>,
  set: SetState<AncienneteStoreSlice>,
  paramName: keyof AncienneteStoreInput,
  value: any
) => {
  if (get().ancienneteData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.ancienneteData.input[paramName as string] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.ancienneteData.input
    );
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.error = errorState;
        state.ancienneteData.isStepValid = isValid;
        state.ancienneteData.input[paramName as string] = value;
      })
    );
  } else {
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.input[paramName as string] = value;
      })
    );
  }
};

export default createAncienneteStore;
