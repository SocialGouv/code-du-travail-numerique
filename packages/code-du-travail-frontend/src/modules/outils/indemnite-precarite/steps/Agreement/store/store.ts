import { StoreApi } from "zustand";
import { produce } from "immer";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { AgreementStoreData, AgreementStoreSlice } from "./types";
import { validateStep } from "./validator";
import { TypeContratStoreSlice } from "../../TypeContrat/store";
import { TermeContratStoreSlice } from "../../TermeContrat/store";
import { captureException } from "@sentry/nextjs";
import {
  getAgreementFromLocalStorage,
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
} from "src/modules/utils/useLocalStorage";
import { loadPublicodes } from "src/modules/outils/common/publicodes";
import { AgreementRoute } from "src/modules/outils/indemnite-depart/types";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { pushAgreementEvents } from "../../../../common/events/pushAgreementEvents";
import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
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

type DownstreamSlices = TypeContratStoreSlice & TermeContratStoreSlice;

/**
 * Les options de l'étape « Type de contrat » dépendent de la convention
 * collective : changer de CC doit repartir d'une saisie vierge.
 */
const resetDownstreamSteps = (
  set: StoreApi<AgreementStoreSlice & DownstreamSlices>["setState"]
) => {
  set(
    produce((state: DownstreamSlices) => {
      state.typeContratData.input.contractOptionId = undefined;
      state.typeContratData.error = {};
      state.typeContratData.hasBeenSubmit = false;
      state.typeContratData.isStepValid = true;
      state.termeContratData.input.finALaDatePrevue = undefined;
      state.termeContratData.input.issueContrat = undefined;
      state.termeContratData.error = {};
      state.termeContratData.hasBeenSubmit = false;
      state.termeContratData.isStepValid = true;
      state.termeContratData.ineligibility = undefined;
    })
  );
};

const createAgreementStore: StoreSliceWrapperIndemnitePrecarite<
  AgreementStoreSlice,
  DownstreamSlices
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
            applyGenericValidation(
              get,
              set,
              "route",
              "agreement" as AgreementRoute
            );
            const idcc = parsedData?.num?.toString();
            if (idcc) {
              // Pas besoin de générer les questions publicodes car elles sont maintenant gérées directement
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
    onRouteChange: (value) => {
      if (value === "not-selected") {
        try {
          applyGenericValidation(get, set, "agreement", undefined);
          removeAgreementFromLocalStorage();
          // Pas besoin de générer les questions publicodes car elles sont maintenant gérées directement
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
                  PublicodesSimulator.INDEMNITE_PRECARITE
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
      resetDownstreamSteps(set);
      applyGenericValidation(get, set, "route", value);
    },
    onAgreementChange: (agreement, enterprise) => {
      try {
        resetDownstreamSteps(set);
        applyGenericValidation(get, set, "agreement", agreement);
        applyGenericValidation(get, set, "enterprise", enterprise);
        if (agreement) {
          saveAgreementToLocalStorage(agreement);
          const idcc = agreement.num?.toString();
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
                  PublicodesSimulator.INDEMNITE_PRECARITE,
                  idcc
                );
            })
          );
        } else {
          removeAgreementFromLocalStorage();
          set(
            produce((state: AgreementStoreSlice) => {
              state.agreementData.publicodes =
                loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
                  PublicodesSimulator.INDEMNITE_PRECARITE
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
      if (isValid && route) {
        // « Traitée » = la convention dispose d'un modèle publicodes pour ce
        // simulateur. Se contenter de sa présence dans `supportedCcn` ferait
        // remonter comme traitées les conventions gérées par d'autres outils.
        const isTreated =
          !!agreement?.num &&
          isCcFullySupported(
            agreement.num,
            PublicodesSimulator.INDEMNITE_PRECARITE
          );
        pushAgreementEvents(
          PublicodesSimulator.INDEMNITE_PRECARITE,
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
        produce((state: AgreementStoreSlice) => {
          state.agreementData.hasBeenSubmit = true;
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
