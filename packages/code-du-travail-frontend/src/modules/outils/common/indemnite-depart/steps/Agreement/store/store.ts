import { StoreApi } from "zustand";
import produce from "immer";
import { validateStep } from "./validator";

import { CommonAgreementStoreData, CommonAgreementStoreSlice } from "./types";

import { PublicodesSimulator, supportedCcn } from "@socialgouv/modeles-social";
import { AgreementRoute, StoreSlicePublicode } from "../../../types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { getAgreementFromLocalStorage } from "src/modules/common/useLocalStorage";
import {
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
} from "src/lib/useLocalStorage";
import { pushAgreementEvents } from "src/outils/common";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { loadPublicodes } from "src/modules/outils/common/publicodes";
import { isCcFullySupportedIndemniteLicenciement } from "../../../common";

const initialState: Omit<
  CommonAgreementStoreData<PublicodesSimulator>,
  "publicodes"
> = {
  input: {
    isAgreementSupportedIndemniteLicenciement: false,
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
  agreementData: {
    ...initialState,
    publicodes: loadPublicodes(simulator),
    indemniteDepartType: type,
    simulator: simulator,
  },
  agreementFunction: {
    onInitAgreementPage: () => {
      try {
        const parsedData = getAgreementFromLocalStorage();
        if (parsedData) {
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
                    state.agreementData.input.informationError = !isOk;
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
        removeAgreementFromLocalStorage();
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
        })
      );
      applyGenericValidation(get, set, "route", value);
      const isOk = get().informationsFunction.generatePublicodesQuestions();
      set(
        produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
          state.agreementData.input.informationError = !isOk;
        })
      );
    },
    onAgreementChange: (agreement, enterprise) => {
      applyGenericValidation(get, set, "agreement", agreement);
      saveAgreementToLocalStorage(agreement);
      applyGenericValidation(get, set, "enterprise", enterprise);
      const idcc = agreement?.num?.toString();
      set(
        produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
          state.agreementData.publicodes = loadPublicodes(simulator, idcc);
          state.agreementData.input.isAgreementSupportedIndemniteLicenciement =
            idcc
              ? isCcFullySupportedIndemniteLicenciement(parseInt(idcc))
              : false;
        })
      );
      const isOk = get().informationsFunction.generatePublicodesQuestions();
      set(
        produce((state: CommonAgreementStoreSlice<PublicodesSimulator>) => {
          state.agreementData.input.informationError = isOk ? false : true;
        })
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
          false
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
