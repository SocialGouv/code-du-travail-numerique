import { StoreApi } from "zustand";
import produce from "immer";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { StoreSliceWrapperPreavisDemission } from "../../store";
import { AgreementStoreData, AgreementStoreSlice } from "./types";
import { InformationsStoreSlice } from "../../Informations/store";
import { captureException } from "@sentry/nextjs";
import {
  getAgreementFromLocalStorage,
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
} from "src/modules/utils/useLocalStorage";
import { loadPublicodes } from "src/modules/outils/common/publicodes";
import { AgreementRoute } from "src/modules/outils/indemnite-depart/types";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { pushAgreementEvents } from "src/modules/outils/common/events/pushAgreementEvents";
import { validateStep } from "./validator";
import { eventEmitter, EventType } from "src/modules/outils/common/events";
import isCcFullySupported from "src/modules/outils/common/utils/isCcFullySupported";

const initialState: Omit<AgreementStoreData, "publicodes"> = {
  input: {
    hasNoEnterpriseSelected: false,
    informationError: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createAgreementStore: StoreSliceWrapperPreavisDemission<
  AgreementStoreSlice,
  InformationsStoreSlice
> = (set, get) => ({
  agreementData: {
    ...initialState,
    publicodes: loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
      PublicodesSimulator.PREAVIS_DEMISSION
    ),
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
              get().informationsFunction.generatePublicodesQuestions();
              set(
                produce((state: AgreementStoreSlice) => {
                  state.agreementData.publicodes =
                    loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
                      PublicodesSimulator.PREAVIS_DEMISSION,
                      idcc
                    );
                })
              );
            }
          }
        }
      } catch (e) {
        console.error(e);
        captureException(e);
      }
    },
    onRouteChange: (value) => {
      if (value === "not-selected") {
        try {
          applyGenericValidation(get, set, "agreement", undefined);
          removeAgreementFromLocalStorage();
          get().informationsFunction.generatePublicodesQuestions();
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
                  PublicodesSimulator.PREAVIS_DEMISSION
                );
            })
          );
        } catch (e) {
          console.error(e);
          captureException(e);
        }
      }
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.input.enterprise = undefined;
          state.agreementData.input.agreement = undefined;
          state.agreementData.input.hasNoEnterpriseSelected = false;
        })
      );
      applyGenericValidation(get, set, "route", value);
    },
    onAgreementChange: (agreement, enterprise) => {
      try {
        applyGenericValidation(get, set, "agreement", agreement);
        applyGenericValidation(get, set, "enterprise", enterprise);
        if (agreement) {
          saveAgreementToLocalStorage(agreement);
          const idcc = agreement.num?.toString();
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
                  PublicodesSimulator.PREAVIS_DEMISSION,
                  idcc
                );
            })
          );
          get().informationsFunction.resetQuestions();
          get().informationsFunction.generatePublicodesQuestions();
        } else {
          removeAgreementFromLocalStorage();
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.PREAVIS_DEMISSION>(
                  PublicodesSimulator.PREAVIS_DEMISSION
                );
            })
          );
        }
      } catch (e) {
        console.error(e);
        captureException(e);
      }
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
      if (
        input.agreement?.num &&
        !isCcFullySupported(
          input.agreement?.num,
          PublicodesSimulator.PREAVIS_DEMISSION
        )
      ) {
        eventEmitter.dispatch(EventType.CC_BLOCK_USER);
      }
      if (isValid && route) {
        pushAgreementEvents(
          PublicodesSimulator.PREAVIS_DEMISSION,
          {
            route,
            selected: agreement,
            enterprise,
          },
          true,
          input.hasNoEnterpriseSelected
        );
      }
      set(
        produce((state: AgreementStoreSlice) => {
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
  get: StoreApi<AgreementStoreSlice>["getState"],
  set: StoreApi<AgreementStoreSlice>["setState"],
  paramName: any,
  value: any
) => {
  if (get().agreementData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreementData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(nextState.agreementData.input);
    set(
      produce((state: AgreementStoreSlice) => {
        state.agreementData.error = errorState;
        state.agreementData.isStepValid = isValid;
        state.agreementData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: AgreementStoreSlice) => {
        state.agreementData.input[paramName] = value;
      })
    );
  }
};

export default createAgreementStore;
