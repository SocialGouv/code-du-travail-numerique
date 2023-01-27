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
import { indemniteLicenciementModeles } from "@socialgouv/modeles-social";
import {
  MatomoAgreementEvent,
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../lib/matomo/types";

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
      const input = get().agreementData.input;
      const { isValid, errorState } = validateStep(input);
      const { route, agreement } = input;
      const agreementIndex = agreement?.num.toString() ?? "";
      const isTreated = !!indemniteLicenciementModeles[agreementIndex];
      if (isValid) {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          "outil",
          `view_step_${toolName}`,
          IndemniteLicenciementStepName.Agreement,
        ]);
        let clickEvent;
        let selectEvent;
        switch (route) {
          case Route.agreement:
            clickEvent = "click_p1";
            selectEvent = MatomoSearchAgreementCategory.AGREEMENT_SELECT_P1;
            break;
          case Route.enterprise:
            clickEvent = "click_p2";
            selectEvent = MatomoSearchAgreementCategory.AGREEMENT_SELECT_P2;
            break;
          case Route.none:
            clickEvent = "click_p3";
            break;
        }
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoSearchAgreementCategory.AGREEMENT_SEARCH_TYPE_OF_USERS,
          clickEvent,
          toolName,
        ]);
        if (agreement?.num) {
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            selectEvent,
            toolName,
            `idcc${agreement?.num}`,
          ]);
        }
        if (agreement?.num) {
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            MatomoBaseEvent.OUTIL,
            isTreated
              ? MatomoAgreementEvent.CC_TREATED
              : MatomoAgreementEvent.CC_UNTREATED,
            `idcc${agreement?.num}`,
          ]);
        }
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
