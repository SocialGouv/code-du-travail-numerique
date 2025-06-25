import { StoreApi } from "zustand";
import produce from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { InformationsStoreData, InformationsStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";
import { CONTRACT_TYPE } from "../../../types";

const initialState: InformationsStoreData = {
  input: {
    criteria: {},
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

const createInformationsStore: StoreSliceWrapperIndemnitePrecarite<
  InformationsStoreSlice,
  AgreementStoreSlice
> = (set, get) => ({
  informationsData: {
    ...initialState,
  },
  informationsFunction: {
    onContractTypeChange: (contractType) => {
      applyGenericValidation(get, set, "contractType", contractType);
      // Reset des critères quand on change de type de contrat
      applyGenericValidation(get, set, "criteria", {});
    },
    onCriteriaChange: (criteria) => {
      applyGenericValidation(get, set, "criteria", criteria);
    },
    shouldSkipStep: () => {
      const state = get();
      // Skip si pas de convention collective ou pas de dispositions conventionnelles
      return (
        !state.agreementData.input.agreement ||
        !hasConventionalProvision(state.agreementData.input.agreement.num)
      );
    },
    onNextStep: () => {
      const input = get().informationsData.input;
      const agreement = get().agreementData.input.agreement;
      const { isValid, errorState } = validateStep(input, agreement);

      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = !isValid;
          state.informationsData.isStepValid = isValid;
          state.informationsData.error = errorState;
        })
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<InformationsStoreSlice & AgreementStoreSlice>["getState"],
  set: StoreApi<InformationsStoreSlice & AgreementStoreSlice>["setState"],
  paramName: any,
  value: any
) => {
  if (get().informationsData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.informationsData.input[paramName] = value;
    });
    const agreement = get().agreementData?.input?.agreement;
    const { isValid, errorState } = validateStep(
      nextState.informationsData.input,
      agreement
    );
    set(
      produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
        state.informationsData.error = errorState;
        state.informationsData.isStepValid = isValid;
        state.informationsData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
        state.informationsData.input[paramName] = value;
      })
    );
  }
};

// Vérifier si une convention collective a des dispositions conventionnelles
function hasConventionalProvision(idcc: number): boolean {
  // Cette logique sera migrée depuis l'ancien système
  // Pour l'instant, retourner true par défaut
  return true;
}

export default createInformationsStore;
