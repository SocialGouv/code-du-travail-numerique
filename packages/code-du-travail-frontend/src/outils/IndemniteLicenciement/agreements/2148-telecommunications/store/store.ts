import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement2148StoreData,
  Agreement2148StoreInput,
  Agreement2148StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";

const initialState: Agreement2148StoreData = {
  input: {
    noticeSalaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement2148StoreSalaires: StoreSlice<
  Agreement2148StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  agreement2148Data: { ...initialState },
  agreement2148Function: {
    onInit: () => {
      const ancienneteInput = get().ancienneteData.input;
      const agreementSalaryPeriod =
        get().agreement2148Data.input.noticeSalaryPeriods ?? [];
      const periods = computeSalaryPeriods({
        dateEntree: ancienneteInput.dateNotification ?? "",
        dateNotification: ancienneteInput.dateSortie ?? "",
      });
      const period: SalaryPeriods[] = periods.map((v) => {
        return { month: v, value: undefined };
      });
      const noticeSalaryPeriods = deepMergeArray(
        period,
        agreementSalaryPeriod,
        "month"
      );

      set(
        produce((state: Agreement2148StoreSlice) => {
          state.agreement2148Data.input.noticeSalaryPeriods =
            noticeSalaryPeriods;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
      get().agreement2148Function.onInit();
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "noticeSalaryPeriods", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement2148StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement2148StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement2148StoreInput,
  value: any
) => {
  if (get().agreement2148Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement2148Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement2148Data.input
    );
    set(
      produce((state: Agreement2148StoreSlice) => {
        state.agreement2148Data.error = errorState;
        state.agreement2148Data.isStepValid = isValid;
        state.agreement2148Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement2148StoreSlice) => {
        state.agreement2148Data.input[paramName] = value;
      })
    );
  }
};
