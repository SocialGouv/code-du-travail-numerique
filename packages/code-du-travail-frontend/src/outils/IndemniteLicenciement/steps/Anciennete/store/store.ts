import produce from "immer";
import { GetState, SetState } from "zustand";
import { CommonAgreementStoreSlice } from "../../../../CommonSteps/Agreement/store";
import { StoreSlice } from "../../../../types";
import { SalairesStoreSlice } from "../../Salaires/store";

import {
  AncienneteStoreData,
  AncienneteStoreInput,
  AncienneteStoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { Absence } from "@socialgouv/modeles-social";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";

const initialState: AncienneteStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {
    absencePeriods: [],
  },
  error: {},
};

const createAncienneteStore: StoreSlice<
  AncienneteStoreSlice,
  SalairesStoreSlice & CommonAgreementStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  ancienneteData: { ...initialState },
  ancienneteFunction: {
    init: () => {
      set(
        produce(
          (state: AncienneteStoreSlice & CommonInformationsStoreSlice) => {
            state.ancienneteData.input.absencePeriods = cleanAbsenceDate(
              state.ancienneteData.input.absencePeriods,
              state
            );
          }
        )
      );
    },
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
      const { isValid, errorState } = validateStep(
        get().ancienneteData.input,
        get().informationsData.input,
        get().agreementData.input.agreement
      );

      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.hasBeenSubmit = isValid ? false : true;
          state.ancienneteData.isStepValid = isValid;
          state.ancienneteData.error = errorState;
        })
      );
      return isValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<
    AncienneteStoreSlice &
      CommonAgreementStoreSlice &
      CommonInformationsStoreSlice
  >,
  set: SetState<
    AncienneteStoreSlice &
      CommonAgreementStoreSlice &
      CommonInformationsStoreSlice
  >,
  paramName: keyof AncienneteStoreInput,
  value: any
) => {
  if (get().ancienneteData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.ancienneteData.input[paramName as string] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.ancienneteData.input,
      get().informationsData.input,
      get().agreementData.input.agreement
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

const cleanAbsenceDate = (
  absencePeriods: Absence[],
  data: CommonInformationsStoreSlice
): Absence[] => {
  return absencePeriods.map((absence) => {
    const dateRequired = absence.motif.startAt
      ? absence.motif.startAt(
          informationToSituation(
            data.informationsData.input.publicodesInformations
          )
        )
      : false;
    if (!dateRequired) {
      return {
        ...absence,
        startedAt: undefined,
      };
    } else {
      return absence;
    }
  });
};

export default createAncienneteStore;
