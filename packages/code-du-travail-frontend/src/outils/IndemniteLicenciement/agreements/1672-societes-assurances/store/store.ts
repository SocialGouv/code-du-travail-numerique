import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement1672StoreData,
  Agreement1672StoreInput,
  Agreement1672StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { ContratTravailStoreSlice } from "../../../steps/ContratTravail/store";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialState: Agreement1672StoreData = {
  input: {
    noticeSalaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement1672StoreSalaires: StoreSlice<
  Agreement1672StoreSlice,
  SalairesStoreSlice &
    AncienneteStoreSlice &
    CommonInformationsStoreSlice &
    ContratTravailStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  agreement1672Data: { ...initialState },
  agreement1672Function: {
    onInit: () => {
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;

      if (dateArretTravail) {
        get().situationFunction.onSituationChange(
          "noticeSalaryPeriods",
          JSON.stringify([])
        );
        return set(
          produce((state: Agreement1672StoreSlice) => {
            state.agreement1672Data.input.noticeSalaryPeriods = [];
          })
        );
      }
      const ancienneteInput = get().ancienneteData.input;
      const input = get().agreement1672Data.input;
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

      get().situationFunction.onSituationChange(
        "noticeSalaryPeriods",
        JSON.stringify(noticeSalaryPeriods)
      );
      set(
        produce((state: Agreement1672StoreSlice) => {
          state.agreement1672Data.input.noticeSalaryPeriods =
            noticeSalaryPeriods;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
      get().agreement1672Function.onInit();
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
  get: StoreApi<Agreement1672StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement1672StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement1672StoreInput,
  value: any
) => {
  if (get().agreement1672Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1672Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1672Data.input
    );
    set(
      produce((state: Agreement1672StoreSlice) => {
        state.agreement1672Data.error = errorState;
        state.agreement1672Data.isStepValid = isValid;
        state.agreement1672Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement1672StoreSlice) => {
        state.agreement1672Data.input[paramName] = value;
      })
    );
  }
};
