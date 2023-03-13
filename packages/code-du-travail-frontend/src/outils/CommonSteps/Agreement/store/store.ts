import { StoreApi } from "zustand";
import produce from "immer";
import { push as matopush } from "@socialgouv/matomo-next";
import { validateStep } from "./validator";

import {
  CommonAgreementStoreData,
  CommonAgreementStoreInput,
  CommonAgreementStoreSlice,
} from "./types";
import { STORAGE_KEY_AGREEMENT, StoreSlicePublicode } from "../../../types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { Agreement } from "../../../../conventions/Search/api/type";
import { loadPublicodes } from "../../../api";
import { ValidationResponse } from "../../../Components/SimulatorLayout";
import { supportedCcn } from "@socialgouv/modeles-social";
import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../lib";
import { pushAgreementEvents } from "../../../common/Agreement";
import { AgreementRoute } from "../../../common/type/WizardType";
import { isCcFullySupportedIndemniteLicenciement } from "../../../IndemniteLicenciement/common";

const initialState: Omit<CommonAgreementStoreData, "publicodes"> = {
  input: {
    isAgreementSupportedIndemniteLicenciement: false,
  },
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
          if (parsedData?.num !== get().agreementData.input.agreement?.num) {
            applyGenericValidation(get, set, "agreement", parsedData);
            applyGenericValidation(
              get,
              set,
              "route",
              "agreement" as AgreementRoute
            );
            const idcc = parsedData?.num?.toString();
            if (idcc) {
              set(
                produce((state: CommonAgreementStoreSlice) => {
                  state.agreementData.publicodes = loadPublicodes(slug, idcc);
                  state.agreementData.input.isAgreementSupportedIndemniteLicenciement =
                    isCcFullySupportedIndemniteLicenciement(parseInt(idcc));
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
      if (value === "not-selected" && window.localStorage) {
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
            state.agreementData.input.isAgreementSupportedIndemniteLicenciement =
              isCcFullySupportedIndemniteLicenciement(parseInt(idcc));
          })
        );
        get().informationsFunction.generatePublicodesQuestions();
      }
    },
    onNextStep: () => {
      const input = get().agreementData.input;
      const { isValid, errorState } = validateStep(input);
      const { route, agreement, enterprise } = input;
      if (isValid && route) {
        const isTreated = !!supportedCcn.find(
          ({ indemniteLicenciement, idcc }) =>
            indemniteLicenciement && idcc === agreement?.num
        );
        pushAgreementEvents(
          toolName,
          {
            route,
            selected: agreement,
            enterprise,
          },
          isTreated
        );
      }
      set(
        produce((state: CommonAgreementStoreSlice) => {
          state.agreementData.hasBeenSubmit = !isValid;
          state.agreementData.isStepValid = isValid;
          state.agreementData.error = errorState;
        })
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
    onAgreementSearch: (data) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH,
        toolName,
        JSON.stringify(data),
      ]);
    },
    onEnterpriseSearch: (data) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        toolName,
        JSON.stringify(data),
      ]);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<CommonAgreementStoreSlice>["getState"],
  set: StoreApi<CommonAgreementStoreSlice>["setState"],
  paramName: any,
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
