import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement1702StoreData,
  Agreement1702StoreInput,
  Agreement1702StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { ContratTravailStoreSlice } from "../../../steps/ContratTravail/store";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialState: Agreement1702StoreData = {
  input: {
    noticeSalaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement1702StoreSalaires: StoreSlice<
  Agreement1702StoreSlice,
  SalairesStoreSlice &
    AncienneteStoreSlice &
    CommonInformationsStoreSlice &
    ContratTravailStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  agreement1702Data: { ...initialState },
  agreement1702Function: {
    onInit: () => {
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;

      if (dateArretTravail) {
        return set(
          produce((state: Agreement1702StoreSlice) => {
            state.agreement1702Data.input.noticeSalaryPeriods = [];
          })
        );
      }
      const ancienneteInput = get().ancienneteData.input;
      const input = get().agreement1702Data.input;
      const agreementSalaryPeriod =
        input.hasReceivedSalaries !== "non" && input.noticeSalaryPeriods
          ? input.noticeSalaryPeriods
          : [];
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
        produce((state: Agreement1702StoreSlice) => {
          state.agreement1702Data.input.noticeSalaryPeriods =
            noticeSalaryPeriods;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
      get().agreement1702Function.onInit();
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
  get: StoreApi<Agreement1702StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement1702StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement1702StoreInput,
  value: any
) => {
  if (get().agreement1702Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1702Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1702Data.input
    );
    set(
      produce((state: Agreement1702StoreSlice) => {
        state.agreement1702Data.error = errorState;
        state.agreement1702Data.isStepValid = isValid;
        state.agreement1702Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement1702StoreSlice) => {
        state.agreement1702Data.input[paramName] = value;
      })
    );
  }
};
