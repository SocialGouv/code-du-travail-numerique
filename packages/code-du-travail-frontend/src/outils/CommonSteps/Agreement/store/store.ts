import { StoreApi } from "zustand";
import produce from "immer";
import { push as matopush } from "@socialgouv/matomo-next";
import { validateStep } from "./validator";

import { CommonAgreementStoreData, CommonAgreementStoreSlice } from "./types";
import { STORAGE_KEY_AGREEMENT, StoreSlicePublicode } from "../../../types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { loadPublicodes } from "../../../api";
import { ValidationResponse } from "../../../Components/SimulatorLayout";
import { PublicodesSimulator, supportedCcn } from "@socialgouv/modeles-social";
import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../lib";
import { pushAgreementEvents } from "../../../common/Agreement";
import { AgreementRoute } from "../../../common/type/WizardType";
import { isCcFullySupportedIndemniteLicenciement } from "../../../CommonIndemniteDepart/common";
import { Agreement } from "../../../types";

const initialState: Omit<
  CommonAgreementStoreData<PublicodesSimulator>,
  "publicodes"
> = {
  input: {
    isAgreementSupportedIndemniteLicenciement: false,
    hasNoEnterpriseSelected: false,
    informationError: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createCommonAgreementStore: StoreSlicePublicode<
  CommonAgreementStoreSlice<PublicodesSimulator>,
  CommonInformationsStoreSlice
> = (set, get, { simulator, type }) => ({
  agreementData: { ...initialState, publicodes: loadPublicodes(simulator) },
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
              const publicodes = loadPublicodes(simulator, idcc);
              set(
                produce(
                  (state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
                    state.agreementData.publicodes = publicodes;
                    state.agreementData.input.isAgreementSupportedIndemniteLicenciement =
                      isCcFullySupportedIndemniteLicenciement(parseInt(idcc));
                  }
                )
              );
              const isOk =
                get().informationsFunction.generatePublicodesQuestions();
              set(
                produce(
                  (state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
                    state.agreementData.input.informationError = isOk
                      ? false
                      : true;
                  }
                )
              );
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    onRouteChange: (value) => {
      if (value === "not-selected") {
        if (window.localStorage) {
          window.localStorage.removeItem(STORAGE_KEY_AGREEMENT);
        }
        set(
          produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
            state.agreementData.publicodes = loadPublicodes(simulator);
          })
        );
      }
      set(
        produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
          state.agreementData.input.enterprise = undefined;
          state.agreementData.input.agreement = undefined;
          state.agreementData.input.hasNoEnterpriseSelected = false;
        })
      );
      applyGenericValidation(get, set, "route", value);
      const isOk = get().informationsFunction.generatePublicodesQuestions();
      set(
        produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
          state.agreementData.input.informationError = isOk ? false : true;
        })
      );
    },
    onAgreementChange: (agreement, enterprise) => {
      applyGenericValidation(get, set, "agreement", agreement);
      window.localStorage.setItem(
        STORAGE_KEY_AGREEMENT,
        JSON.stringify(agreement)
      );
      applyGenericValidation(get, set, "enterprise", enterprise);
      const idcc = agreement?.num?.toString();
      if (idcc) {
        set(
          produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
            state.agreementData.publicodes = loadPublicodes(simulator, idcc);
            state.agreementData.input.isAgreementSupportedIndemniteLicenciement =
              isCcFullySupportedIndemniteLicenciement(parseInt(idcc));
          })
        );
      }
      const isOk = get().informationsFunction.generatePublicodesQuestions();
      set(
        produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
          state.agreementData.input.informationError = isOk ? false : true;
        })
      );
    },
    setHasNoEnterpriseSelected: (value) => {
      applyGenericValidation(
        get,
        set,
        "hasNoEnterpriseSelected",
        value ? value : false
      );
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
          type,
          {
            route,
            selected: agreement,
            enterprise,
          },
          isTreated,
          input.hasNoEnterpriseSelected
        );
      }
      set(
        produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
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
        type,
        JSON.stringify(data),
      ]);
    },
    onEnterpriseSearch: (data) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        type,
        JSON.stringify(data),
      ]);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<CommonAgreementStoreSlice<PublicodesSimulator>>["getState"],
  set: StoreApi<CommonAgreementStoreSlice<PublicodesSimulator>>["setState"],
  paramName: any,
  value: any
) => {
  if (get().agreementData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreementData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(nextState.agreementData.input);
    set(
      produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
        state.agreementData.error = errorState;
        state.agreementData.isStepValid = isValid;
        state.agreementData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
        state.agreementData.input[paramName] = value;
      })
    );
  }
};

export default createCommonAgreementStore;
