import produce from "immer";
import { StoreApi } from "zustand";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement29StoreData,
  Agreement29StoreInput,
  Agreement29StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";

const initialState: Agreement29StoreData = {
  input: {
    shouldAskSixBestSalaries: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement29StoreSalaires: StoreSlice<
  Agreement29StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  agreement29Data: { ...initialState },
  agreement29Function: {
    init: () => {
      const shouldAskSixBestSalaries =
        get().informationsData.input.publicodesInformations.find(
          (item) =>
            item.question.name ===
            "contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle"
        )?.info ===
        "'Assistants familiaux des services de placements familiaux spécialisés'";
      set(
        produce((state: Agreement29StoreSlice) => {
          state.agreement29Data.input.shouldAskSixBestSalaries = shouldAskSixBestSalaries;
        })
      );
    },
    onChangeSixBestSalariesTotal: (value) => {
      applyGenericValidation(get, set, "sixBestSalariesTotal", value);
    },
    onChangeHasSixBestSalaries: (value) => {
      applyGenericValidation(get, set, "hasSixBestSalaries", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement29StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement29StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement29StoreInput,
  value: any
) => {
  if (get().agreement29Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement29Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement29Data.input
    );
    set(
      produce((state: Agreement29StoreSlice) => {
        state.agreement29Data.error = errorState;
        state.agreement29Data.isStepValid = isValid;
        state.agreement29Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStep();
  } else {
    set(
      produce((state: Agreement29StoreSlice) => {
        state.agreement29Data.input[paramName] = value;
      })
    );
  }
};
