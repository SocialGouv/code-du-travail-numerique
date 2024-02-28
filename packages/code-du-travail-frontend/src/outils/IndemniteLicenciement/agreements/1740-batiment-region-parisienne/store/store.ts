import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement1740StoreData,
  Agreement1740StoreInput,
  Agreement1740StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { ContratTravailStoreSlice } from "../../../steps/ContratTravail/store";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialState: Agreement1740StoreData = {
  input: {
    noticeSalaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement1740StoreSalaires: StoreSlice<
  Agreement1740StoreSlice,
  SalairesStoreSlice &
    AncienneteStoreSlice &
    CommonInformationsStoreSlice &
    ContratTravailStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  agreement1740Data: { ...initialState },
  agreement1740Function: {
    onInit: () => {
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;

      if (dateArretTravail) {
        get().situationFunction.setSituation(
          "noticeSalaryPeriods",
          JSON.stringify("[]")
        );
        return set(
          produce((state: Agreement1740StoreSlice) => {
            state.agreement1740Data.input.noticeSalaryPeriods = [];
          })
        );
      }
      const ancienneteInput = get().ancienneteData.input;
      const input = get().agreement1740Data.input;
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

      get().situationFunction.setSituation(
        "noticeSalaryPeriods",
        JSON.stringify(noticeSalaryPeriods)
      );
      set(
        produce((state: Agreement1740StoreSlice) => {
          state.agreement1740Data.input.noticeSalaryPeriods =
            noticeSalaryPeriods;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
      get().agreement1740Function.onInit();
    },
    onSalariesChange: (value) => {
      get().situationFunction.setSituation(
        "noticeSalaryPeriods",
        JSON.stringify(value)
      );
      applyGenericValidation(get, set, "noticeSalaryPeriods", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement1740StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement1740StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement1740StoreInput,
  value: any
) => {
  if (get().agreement1740Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement1740Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement1740Data.input
    );
    set(
      produce((state: Agreement1740StoreSlice) => {
        state.agreement1740Data.error = errorState;
        state.agreement1740Data.isStepValid = isValid;
        state.agreement1740Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement1740StoreSlice) => {
        state.agreement1740Data.input[paramName] = value;
      })
    );
  }
};
