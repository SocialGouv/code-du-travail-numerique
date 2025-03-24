import { StoreApi } from "zustand";
import {
  ContratTravailStoreData,
  ContratTravailStoreInput,
  ContratTravailStoreSlice,
} from "./types";
import produce from "immer";
import { IndemniteDepartType, StoreSlice } from "../../../types";
import { validateStep } from "./validator";
import { AncienneteStoreSlice } from "../../Anciennete";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import * as Sentry from "@sentry/nextjs";
import { CommonSituationStoreSlice } from "../../../situationStore";
import { loadPublicodes } from "../../../../common/publicodes/api";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

const initialState: ContratTravailStoreData = {
  input: {},
  error: {
    errorCdd: false,
    errorFauteGrave: false,
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createContratTravailStore: StoreSlice<
  ContratTravailStoreSlice,
  AncienneteStoreSlice &
    CommonInformationsStoreSlice &
    CommonSituationStoreSlice
> = (set, get, { type }) => ({
  contratTravailConfig: {
    showFauteGrave: type === IndemniteDepartType.LICENCIEMENT,
  },
  contratTravailData: { ...initialState },
  contratTravailFunction: {
    onChangeTypeContratTravail: (value) => {
      get().situationFunction.setSituation("typeContratTravail", value);
      applyGenericValidation(get, set, "typeContratTravail", value);
    },
    onChangeLicenciementFauteGrave: (value) => {
      get().situationFunction.setSituation("licenciementFauteGrave", value);
      applyGenericValidation(get, set, "licenciementFauteGrave", value);
    },
    onChangeLicenciementInaptitude: (value) => {
      applyGenericValidation(get, set, "licenciementInaptitude", value);
      applyGenericValidation(get, set, "dateArretTravail", undefined);
      applyGenericValidation(get, set, "arretTravail", undefined);
      get().informationsFunction.generatePublicodesQuestions();
    },
    onChangeArretTravail: (value) => {
      applyGenericValidation(get, set, "arretTravail", value);
      applyGenericValidation(get, set, "dateArretTravail", undefined);
    },
    onChangeDateArretTravail: (value) => {
      applyGenericValidation(get, set, "dateArretTravail", value);
      if (get().ancienneteData.hasBeenSubmit) {
        get().ancienneteFunction.onNextStep();
      }
    },
    onNextStep: () => {
      const state = get().contratTravailData.input;
      const { isValid, errorState } = validateStep(state);
      let errorEligibility;

      if (isValid) {
        try {
          const simulator =
            type === IndemniteDepartType.LICENCIEMENT
              ? PublicodesSimulator.INDEMNITE_LICENCIEMENT
              : PublicodesSimulator.RUPTURE_CONVENTIONNELLE;
          const publicodes = loadPublicodes<typeof simulator>(simulator);
          const result = publicodes.calculate(get().situationData.situation);

          if (result.type === "ineligibility") {
            errorEligibility = result.ineligibility;
          }
        } catch (e) {
          console.error(e);
          Sentry.captureException(e);
        }
      }

      set(
        produce((state: ContratTravailStoreSlice) => {
          state.contratTravailData.hasBeenSubmit = !isValid;
          state.contratTravailData.isStepValid = isValid;
          state.contratTravailData.error = errorState;
          state.contratTravailData.error.errorEligibility = errorEligibility;
        })
      );
      return errorEligibility
        ? ValidationResponse.NotEligible
        : isValid
          ? ValidationResponse.Valid
          : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<
    ContratTravailStoreSlice & CommonSituationStoreSlice
  >["getState"],
  set: StoreApi<ContratTravailStoreSlice>["setState"],
  paramName: keyof ContratTravailStoreInput,
  value: any
) => {
  if (get().contratTravailData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.contratTravailData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.contratTravailData.input
    );
    set(
      produce((state: ContratTravailStoreSlice) => {
        state.contratTravailData.error = errorState;
        state.contratTravailData.isStepValid = isValid;
        state.contratTravailData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: ContratTravailStoreSlice) => {
        state.contratTravailData.input[paramName] = value;
      })
    );
  }
};

export default createContratTravailStore;
