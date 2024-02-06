import { SalaryPeriods } from "@socialgouv/modeles-social";
import produce from "immer";
import { StoreApi } from "zustand";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement2596StoreData,
  Agreement2596StoreInput,
  Agreement2596StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { ContratTravailStoreSlice } from "../../../steps/ContratTravail/store";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialState: Agreement2596StoreData = {
  input: {
    noticeSalaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement2596StoreSalaires: StoreSlice<
  Agreement2596StoreSlice,
  SalairesStoreSlice &
    AncienneteStoreSlice &
    CommonInformationsStoreSlice &
    ContratTravailStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  agreement2596Data: { ...initialState },
  agreement2596Function: {
    onInit: () => {
      const categoryPro =
        get().informationsData.input.publicodesInformations.find(
          (item) =>
            item.question.name ===
            "contrat salarié - convention collective - coiffure - indemnité de licenciement - catégorie professionnelle"
        )?.info;
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;

      if (
        (categoryPro !== "'Cadres'" &&
          categoryPro !== "'Agents de maîtrise'") ||
        dateArretTravail
      ) {
        return set(
          produce((state: Agreement2596StoreSlice) => {
            state.agreement2596Data.input.noticeSalaryPeriods = [];
          })
        );
      }
      const ancienneteInput = get().ancienneteData.input;
      const input = get().agreement2596Data.input;
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
        produce((state: Agreement2596StoreSlice) => {
          state.agreement2596Data.input.noticeSalaryPeriods =
            noticeSalaryPeriods;
        })
      );
    },
    onChangeHasReceivedSalaries: (value) => {
      applyGenericValidation(get, set, "hasReceivedSalaries", value);
      get().agreement2596Function.onInit();
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
  get: StoreApi<Agreement2596StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement2596StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement2596StoreInput,
  value: any
) => {
  if (get().agreement2596Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement2596Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement2596Data.input
    );
    set(
      produce((state: Agreement2596StoreSlice) => {
        state.agreement2596Data.error = errorState;
        state.agreement2596Data.isStepValid = isValid;
        state.agreement2596Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement2596StoreSlice) => {
        state.agreement2596Data.input[paramName] = value;
      })
    );
  }
};
