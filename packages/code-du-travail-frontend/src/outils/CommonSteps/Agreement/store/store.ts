import { StoreApi } from "zustand";
import produce from "immer";
import { push as matopush } from "@socialgouv/matomo-next";
import { validateStep } from "./validator";

import {
  CommonAgreementStoreData,
  CommonAgreementStoreInput,
  CommonAgreementStoreSlice,
  Route,
} from "./types";
import { STORAGE_KEY_AGREEMENT, StoreSlicePublicode } from "../../../types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { Agreement } from "../../../../conventions/Search/api/type";
import { loadPublicodes } from "../../../api";
import { ValidationResponse } from "../../../Components/SimulatorLayout";
import { IndemniteLicenciementStepName } from "../../../IndemniteLicenciement";
import { MatomoBaseEvent } from "../../../../lib/matomo/types";

const initialState: Omit<CommonAgreementStoreData, "publicodes"> = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createCommonAgreementStore: StoreSlicePublicode<
  CommonAgreementStoreSlice,
  CommonInformationsStoreSlice
> = (set, get, { slug, toolName }) => ({
  agreementData: { ...initialState, publicodes: loadPublicodes(slug) },
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
            const idcc = parsedData?.num?.toString();
            if (idcc) {
              set(
                produce((state: CommonAgreementStoreSlice) => {
                  state.agreementData.publicodes = loadPublicodes(slug, idcc);
                })
              );
              get().informationsFunction.generatePublicodesQuestions();
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    onRouteChange: (value) => {
      if (value === Route.none && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY_AGREEMENT);
      }
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
      const idcc = agreement?.num?.toString();
      if (idcc) {
        set(
          produce((state: CommonAgreementStoreSlice) => {
            state.agreementData.publicodes = loadPublicodes(slug, idcc);
          })
        );
        get().informationsFunction.generatePublicodesQuestions();
      }
    },
    onNextStep: () => {
      const { isValid, errorState } = validateStep(get().agreementData.input);
      if (isValid) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          "outil",
          `view_step_${toolName}`,
          IndemniteLicenciementStepName.Agreement,
        ]);
      }
      set(
        produce((state: CommonAgreementStoreSlice) => {
          state.agreementData.hasBeenSubmit = isValid ? false : true;
          state.agreementData.isStepValid = isValid;
          state.agreementData.error = errorState;
        })
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
    onPrevStep: () => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        "outil",
        `click_previous_${toolName}`,
        IndemniteLicenciementStepName.Agreement,
      ]);
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
