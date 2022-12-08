import { StoreApi } from "zustand";
import produce from "immer";
import { validateStep } from "./validator";

import {
  CommonAgreementStoreData,
  CommonAgreementStoreInput,
  CommonAgreementStoreSlice,
  Route,
} from "./types";
import { STORAGE_KEY_AGREEMENT, StoreSlice } from "../../../types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { Agreement } from "../../../../conventions/Search/api/type";

const initialState: CommonAgreementStoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createCommonAgreementStore: StoreSlice<
  CommonAgreementStoreSlice,
  CommonInformationsStoreSlice
> = (set, get) => ({
  agreementData: { ...initialState },
  agreementFunction: {
    onInitAgreementPage: () => {
      try {
        const data =
          window.localStorage &&
          window.localStorage.getItem(STORAGE_KEY_AGREEMENT);
        if (data) {
          const parsedData: Agreement = JSON.parse(data);
          if (parsedData.num !== get().agreementData.input.agreement?.num) {
            applyGenericValidation(get, set, "agreement", parsedData);
            applyGenericValidation(get, set, "route", Route.agreement);
            get().informationsFunction.generatePublicodesQuestions();
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    onRouteChange: (value) => {
      set(
        produce((state: CommonAgreementStoreSlice) => {
          state.agreementData.input.enterprise = undefined;
          state.agreementData.input.agreement = undefined;
        })
      );
      applyGenericValidation(get, set, "route", value);
      get().informationsFunction.generatePublicodesQuestions();
    },
    onAgreementChange: (agreement, enterprise) => {
      applyGenericValidation(get, set, "agreement", agreement);
      if (window.localStorage)
        window.localStorage.setItem(
          STORAGE_KEY_AGREEMENT,
          JSON.stringify(agreement)
        );
      applyGenericValidation(get, set, "enterprise", enterprise);
      get().informationsFunction.generatePublicodesQuestions();
    },
    onValidateStep: () => {
      const { isValid, errorState } = validateStep(get().agreementData.input);
      set(
        produce((state: CommonAgreementStoreSlice) => {
          state.agreementData.hasBeenSubmit = isValid ? false : true;
          state.agreementData.isStepValid = isValid;
          state.agreementData.error = errorState;
        })
      );
      return isValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<CommonAgreementStoreSlice>["getState"],
  set: StoreApi<CommonAgreementStoreSlice>["setState"],
  paramName: keyof CommonAgreementStoreInput,
  value: any
) => {
  if (get().agreementData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreementData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(nextState.agreementData.input);
    set(
      produce((state: CommonAgreementStoreSlice) => {
        state.agreementData.error = errorState;
        state.agreementData.isStepValid = isValid;
        state.agreementData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: CommonAgreementStoreSlice) => {
        state.agreementData.input[paramName] = value;
      })
    );
  }
};

export default createCommonAgreementStore;
