import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement1516StoreData,
  Agreement1516StoreInput,
  Agreement1516StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { ContratTravailStoreSlice } from "../../../steps/ContratTravail/store";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialState: Agreement1516StoreData = {
  input: {
    noticeSalaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement1516StoreSalaires: StoreSlice<
  Agreement1516StoreSlice,
  SalairesStoreSlice &
    AncienneteStoreSlice &
    ContratTravailStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  agreement1516Data: { ...initialState },
  agreement1516Function: {
    onInit: () => {
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;

      if (dateArretTravail) {
        return set(
          produce((state: Agreement1516StoreSlice) => {
            state.agreement1516Data.input.noticeSalaryPeriods = [];
          })
        );
      }
      const ancienneteInput = get().ancienneteData.input;
      const input = get().agreement1516Data.input;
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
        produce((state: Agreement1516StoreSlice) => {
          state.agreement1516Data.input.noticeSalaryPeriods =
            noticeSalaryPeriods;
          state.agreement1516Data.input.noticePeriodsMoreThan3Months =
            periods.length > 3;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
      get().agreement1516Function.onInit();
    },
    onSalariesChange: (value) => {
      get().situationFunction.onSituationChange(
        "noticeSalaryPeriods",
        JSON.stringify(value)
      );
      applyGenericValidation(get, set, "noticeSalaryPeriods", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement1516StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement1516StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement1516StoreInput,
  value: any
) => {
  if (get().agreement1516Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1516Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1516Data.input
    );
    set(
      produce((state: Agreement1516StoreSlice) => {
        state.agreement1516Data.error = errorState;
        state.agreement1516Data.isStepValid = isValid;
        state.agreement1516Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement1516StoreSlice) => {
        state.agreement1516Data.input[paramName] = value;
      })
    );
  }
};
