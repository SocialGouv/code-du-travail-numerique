import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement1483StoreData,
  Agreement1483StoreInput,
  Agreement1483StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { ContratTravailStoreSlice } from "../../../steps/ContratTravail/store";

const initialState: Agreement1483StoreData = {
  input: {
    noticeSalaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement1483StoreSalaires: StoreSlice<
  Agreement1483StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice & ContratTravailStoreSlice
> = (set, get) => ({
  agreement1483Data: { ...initialState },
  agreement1483Function: {
    onInit: () => {
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;

      if (dateArretTravail) {
        return set(
          produce((state: Agreement1483StoreSlice) => {
            state.agreement1483Data.input.noticeSalaryPeriods = [];
          })
        );
      }
      const ancienneteInput = get().ancienneteData.input;
      const input = get().agreement1483Data.input;
      const agreementSalaryPeriod =
        input.hasReceivedSalaries !== "non" && input.noticeSalaryPeriods
          ? input.noticeSalaryPeriods
          : [];
      const periods = computeSalaryPeriods({
        dateEntree: ancienneteInput.dateNotification ?? "",
        dateNotification: ancienneteInput.dateSortie ?? "",
      });

      const last3MonthsPeriods = periods.slice(0, 3);
      const period: SalaryPeriods[] = last3MonthsPeriods.map((v) => {
        return { month: v, value: undefined };
      });
      const noticeSalaryPeriods = deepMergeArray(
        period,
        agreementSalaryPeriod,
        "month"
      );

      set(
        produce((state: Agreement1483StoreSlice) => {
          state.agreement1483Data.input.noticeSalaryPeriods =
            noticeSalaryPeriods;
          state.agreement1483Data.input.noticePeriodsMoreThan3Months =
            periods.length > 3;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
      get().agreement1483Function.onInit();
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "noticeSalaryPeriods", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement1483StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement1483StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement1483StoreInput,
  value: any
) => {
  if (get().agreement1483Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1483Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1483Data.input
    );
    set(
      produce((state: Agreement1483StoreSlice) => {
        state.agreement1483Data.error = errorState;
        state.agreement1483Data.isStepValid = isValid;
        state.agreement1483Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement1483StoreSlice) => {
        state.agreement1483Data.input[paramName] = value;
      })
    );
  }
};
