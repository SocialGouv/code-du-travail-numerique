import { StoreApi } from "zustand";
import produce from "immer";
import { push as matopush } from "@socialgouv/matomo-next";

import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { AgreementStoreData, AgreementStoreSlice } from "./types";
import { captureException } from "@sentry/nextjs";
import {
  getAgreementFromLocalStorage,
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
} from "src/modules/common/useLocalStorage";
import { MatomoBaseEvent, MatomoSearchAgreementCategory } from "src/lib";
import { loadPublicodes } from "src/modules/outils/common/publicodes";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";

const initialState: Omit<AgreementStoreData, "publicodes"> = {
  input: {
    hasNoEnterpriseSelected: false,
    informationError: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createAgreementStore: StoreSliceWrapperIndemnitePrecarite<
  AgreementStoreSlice
> = (set, get) => ({
  agreementData: {
    ...initialState,
    publicodes: loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
      PublicodesSimulator.INDEMNITE_PRECARITE
    ),
  },
  agreementFunction: {
    onInitAgreementPage: () => {
      try {
        const parsedData = getAgreementFromLocalStorage();
        if (parsedData) {
          if (parsedData?.num !== get().agreementData.input.agreement?.num) {
            applyGenericValidation(get, set, "agreement", parsedData);
            const idcc = parsedData?.num?.toString();
            if (idcc) {
              set(
                produce((state: AgreementStoreSlice) => {
                  state.agreementData.publicodes =
                    loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
                      PublicodesSimulator.INDEMNITE_PRECARITE,
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
    onAgreementChange: (agreement, enterprise) => {
      applyGenericValidation(get, set, "agreement", agreement);
      if (agreement) {
        saveAgreementToLocalStorage(agreement);
        const idcc = agreement?.num?.toString();
        if (idcc) {
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
                  PublicodesSimulator.INDEMNITE_PRECARITE,
                  idcc
                );
            })
          );
        }
      }
      try {
        applyGenericValidation(get, set, "enterprise", enterprise);
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

      set(
        produce((state: AgreementStoreSlice) => {
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
        "indemnite-precarite",
        JSON.stringify(data),
      ]);
    },
    onEnterpriseSearch: (data) => {
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        "indemnite-precarite",
        JSON.stringify(data),
      ]);
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
