import { GetState, SetState } from "zustand";
import produce from "immer";
import { validateStep } from "./validator";

import {
  CommonAgreementStoreData,
  CommonAgreementStoreInput,
  CommonAgreementStoreSlice,
  Route,
} from "./types";
import { StoreSlice } from "../../../types";
import { CommonInformationsStoreSlice } from "../../Informations/store";

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
      const data =
        window.localStorage && window.localStorage.getItem("convention");
      if (data) {
        applyGenericValidation(get, set, "agreement", JSON.parse(data));
        applyGenericValidation(get, set, "route", Route.agreement);
        get().informationsFunction.generatePublicodesQuestions();
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
        window.localStorage.setItem("convention", JSON.stringify(agreement));
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
  get: GetState<CommonAgreementStoreSlice>,
  set: SetState<CommonAgreementStoreSlice>,
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
