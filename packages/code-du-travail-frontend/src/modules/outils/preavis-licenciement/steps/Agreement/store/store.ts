import { StoreApi } from "zustand";
import produce from "immer";
import { push as matopush } from "@socialgouv/matomo-next";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { AgreementStoreSlice } from "./types";
import { validateAgreementStepWithState } from "./validator";
import { StoreSliceWrapperPreavisLicenciement } from "../../store";
import { captureException } from "@sentry/nextjs";
import {
  getAgreementFromLocalStorage,
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
} from "src/modules/common/useLocalStorage";
import { MatomoBaseEvent, MatomoSearchAgreementCategory } from "src/lib";
import { loadPublicodes } from "src/modules/outils/common/publicodes";
import { AgreementRoute } from "src/modules/outils/indemnite-depart/types";
import { pushAgreementEvents } from "../../../../common/events/pushAgreementEvents";
import getSupportedCc from "src/modules/outils/common/utils/getSupportedCc";

const initialState = {
  input: {
    route: undefined,
    agreement: undefined,
    enterprise: undefined,
    hasNoEnterpriseSelected: false,
    informationError: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true, // Par défaut, l'étape est valide pour permettre la navigation
};

const createAgreementStore: StoreSliceWrapperPreavisLicenciement<
  AgreementStoreSlice
> = (set, get) => ({
  agreementData: {
    ...initialState,
    publicodes: loadPublicodes<PublicodesSimulator.PREAVIS_LICENCIEMENT>(
      PublicodesSimulator.PREAVIS_LICENCIEMENT
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
              set(
                produce((state: AgreementStoreSlice) => {
                  state.agreementData.publicodes =
                    loadPublicodes<PublicodesSimulator.PREAVIS_LICENCIEMENT>(
                      PublicodesSimulator.PREAVIS_LICENCIEMENT,
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
    onRouteChange: (value: AgreementRoute) => {
      if (value === "not-selected") {
        try {
          applyGenericValidation(get, set, "agreement", undefined);
          removeAgreementFromLocalStorage();
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.PREAVIS_LICENCIEMENT>(
                  PublicodesSimulator.PREAVIS_LICENCIEMENT
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
    onAgreementChange: (agreement: any, enterprise?: any) => {
      applyGenericValidation(get, set, "agreement", agreement);
      saveAgreementToLocalStorage(agreement);
      try {
        applyGenericValidation(get, set, "enterprise", enterprise);
        const idcc = agreement?.num?.toString();
        set(
          produce((state: AgreementStoreSlice) => {
            state.agreementData.publicodes =
              loadPublicodes<PublicodesSimulator.PREAVIS_LICENCIEMENT>(
                PublicodesSimulator.PREAVIS_LICENCIEMENT,
                idcc
              );
          })
        );
      } catch (e) {
        console.error(e);
        captureException(e);
      }
    },
    setHasNoEnterpriseSelected: (value: boolean) => {
      applyGenericValidation(
        get,
        set,
        "hasNoEnterpriseSelected",
        value ? value : false
      );
    },
    onNextStep: () => {
      const input = get().agreementData.input;
      const { errorState, isValid } = validateAgreementStepWithState(input);
      const { route, agreement, enterprise } = input;
      if (isValid && route) {
        const isTreated = !!getSupportedCc(
          PublicodesSimulator.PREAVIS_LICENCIEMENT
        ).find(({ idcc }) => idcc === agreement?.num);
        pushAgreementEvents(
          PublicodesSimulator.PREAVIS_LICENCIEMENT,
          {
            route,
            selected: agreement,
            enterprise,
          },
          isTreated,
          input.hasNoEnterpriseSelected || false
        );
      }
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.hasBeenSubmit = true;
          state.agreementData.isStepValid = isValid;
          state.agreementData.error = errorState;
        })
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
    onAgreementSearch: (data: any) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH,
        PublicodesSimulator.PREAVIS_LICENCIEMENT,
        JSON.stringify(data),
      ]);
    },
    onEnterpriseSearch: (data: any) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        PublicodesSimulator.PREAVIS_LICENCIEMENT,
        JSON.stringify(data),
      ]);
    },
    resetStep: () => {
      set((state) => ({
        ...state,
        agreementData: {
          ...state.agreementData,
          input: {
            route: undefined,
            agreement: undefined,
            enterprise: undefined,
            hasNoEnterpriseSelected: false,
            informationError: false,
          },
          error: {},
          hasBeenSubmit: false,
          isStepValid: true, // Reset à true pour permettre la navigation
        },
      }));
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
    const { errorState, isValid } = validateAgreementStepWithState(
      nextState.agreementData.input
    );
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

export { createAgreementStore };
