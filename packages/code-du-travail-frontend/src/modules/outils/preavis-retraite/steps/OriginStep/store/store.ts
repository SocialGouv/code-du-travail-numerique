import { StoreApi } from "zustand";
import {
  OriginDepartStoreData,
  OriginDepartStoreInput,
  OriginDepartStoreSlice,
} from "./types";
import { produce } from "immer";
import { validateStep } from "./validator";
import { StoreSliceWrapperPreavisRetraite } from "../../store";
import { InformationsStoreSlice } from "../../Informations/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { sendPageEvent } from "src/modules/analytics/events";
import { SimulatorTitle } from "src/modules/outils/common/events/simulators";

const initialState: OriginDepartStoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createOriginDepartStore: StoreSliceWrapperPreavisRetraite<
  OriginDepartStoreSlice,
  InformationsStoreSlice
> = (set, get) => ({
  originDepartData: { ...initialState },
  originDepartFunction: {
    onChangeOriginDepart: (value) => {
      applyGenericValidation(get, set, "originDepart", value);
      get().informationsFunction.generatePublicodesQuestions();
    },
    onNextStep: () => {
      const state = get().originDepartData.input;
      const { isValid, errorState } = validateStep(state);

      set(
        produce((state: OriginDepartStoreSlice) => {
          state.originDepartData.hasBeenSubmit = !isValid;
          state.originDepartData.isStepValid = isValid;
          state.originDepartData.error = errorState;
        })
      );

      // Émis depuis un store zustand, hors rendu React : d'où `sendPageEvent`
      // (non-hook). L'origine du départ était l'ACTION Matomo (`mise` / `depart`,
      // sans catégorie de page) ; elle devient une clé de payload.
      sendPageEvent("select_retirement_origin", {
        simulator: SimulatorTitle.PREAVIS_RETRAITE,
        origin:
          get().originDepartData.input.originDepart === "mise-retraite"
            ? "mise-retraite"
            : "depart-retraite",
      });

      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<OriginDepartStoreSlice>["getState"],
  set: StoreApi<OriginDepartStoreSlice>["setState"],
  paramName: keyof OriginDepartStoreInput,
  value: any
) => {
  if (get().originDepartData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.originDepartData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.originDepartData.input
    );
    set(
      produce((state: OriginDepartStoreSlice) => {
        state.originDepartData.error = errorState;
        state.originDepartData.isStepValid = isValid;
        state.originDepartData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: OriginDepartStoreSlice) => {
        state.originDepartData.input[paramName] = value;
      })
    );
  }
};

export default createOriginDepartStore;
