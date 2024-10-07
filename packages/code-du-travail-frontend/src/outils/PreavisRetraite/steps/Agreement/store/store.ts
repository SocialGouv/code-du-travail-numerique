import { StoreApi } from "zustand";
import produce from "immer";
import { push as matopush } from "@socialgouv/matomo-next";

import { PublicodesSimulator, supportedCcn } from "@socialgouv/modeles-social";
import { loadPublicodes } from "../../../../api";
import { Agreement, STORAGE_KEY_AGREEMENT } from "../../../../types";
import { AgreementRoute } from "../../../../common/type/WizardType";
import { pushAgreementEvents } from "../../../../common";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../../lib";
import { StoreSliceWrapperPreavisRetraite } from "../../store";
import { AgreementStoreData, AgreementStoreSlice } from "./types";
import { validateStep } from "./validator";
import { InformationsStoreSlice } from "../../Informations/store";
import { captureException } from "@sentry/nextjs";
import { OriginDepartStoreSlice } from "../../OriginStep/store";
import {
  getAgreementFromLocalStorage,
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
} from "../../../../../lib/useLocalStorage";

const initialState: Omit<AgreementStoreData, "publicodes"> = {
  input: {
    hasNoEnterpriseSelected: false,
    informationError: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createAgreementStore: StoreSliceWrapperPreavisRetraite<
  AgreementStoreSlice,
  InformationsStoreSlice & OriginDepartStoreSlice
> = (set, get) => ({
  agreementData: {
    ...initialState,
    publicodes: loadPublicodes<PublicodesSimulator.PREAVIS_RETRAITE>(
      PublicodesSimulator.PREAVIS_RETRAITE,
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
              "agreement" as AgreementRoute,
            );
            const idcc = parsedData?.num?.toString();
            if (idcc) {
              get().informationsFunction.generatePublicodesQuestions();
              set(
                produce((state: AgreementStoreSlice) => {
                  state.agreementData.publicodes =
                    loadPublicodes<PublicodesSimulator.PREAVIS_RETRAITE>(
                      PublicodesSimulator.PREAVIS_RETRAITE,
                      idcc,
                    );
                }),
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
          removeAgreementFromLocalStorage();
          get().informationsFunction.generatePublicodesQuestions();
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.PREAVIS_RETRAITE>(
                  PublicodesSimulator.PREAVIS_RETRAITE,
                );
            }),
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
        }),
      );
      applyGenericValidation(get, set, "route", value);
    },
    onAgreementChange: (agreement, enterprise) => {
      applyGenericValidation(get, set, "agreement", agreement);
      saveAgreementToLocalStorage(agreement);
      try {
        applyGenericValidation(get, set, "enterprise", enterprise);
        const idcc = agreement?.num?.toString();
        get().informationsFunction.generatePublicodesQuestions();
        set(
          produce((state: AgreementStoreSlice) => {
            state.agreementData.publicodes =
              loadPublicodes<PublicodesSimulator.PREAVIS_RETRAITE>(
                PublicodesSimulator.PREAVIS_RETRAITE,
                idcc,
              );
          }),
        );
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
        value ? value : false,
      );
    },
    onNextStep: () => {
      const input = get().agreementData.input;
      const { isValid, errorState } = validateStep(input);
      const { route, agreement, enterprise } = input;
      if (isValid && route) {
        const isTreated = !!supportedCcn.find(
          ({ preavisRetraite, idcc }) =>
            preavisRetraite && idcc === agreement?.num,
        );
        pushAgreementEvents(
          PublicodesSimulator.PREAVIS_RETRAITE,
          {
            route,
            selected: agreement,
            enterprise,
          },
          isTreated,
          input.hasNoEnterpriseSelected,
        );
      }
      set(
        produce((state: AgreementStoreSlice) => {
          state.agreementData.hasBeenSubmit = !isValid;
          state.agreementData.isStepValid = isValid;
          state.agreementData.error = errorState;
        }),
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
    onAgreementSearch: (data) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH,
        PublicodesSimulator.PREAVIS_RETRAITE,
        JSON.stringify(data),
      ]);
    },
    onEnterpriseSearch: (data) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        PublicodesSimulator.PREAVIS_RETRAITE,
        JSON.stringify(data),
      ]);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<AgreementStoreSlice>["getState"],
  set: StoreApi<AgreementStoreSlice>["setState"],
  paramName: any,
  value: any,
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
      }),
    );
  } else {
    set(
      produce((state: AgreementStoreSlice) => {
        state.agreementData.input[paramName] = value;
      }),
    );
  }
};

export default createAgreementStore;
