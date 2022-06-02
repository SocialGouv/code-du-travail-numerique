import create from "zustand";
import { combine } from "zustand/middleware";
import { deepEqualObject } from "../../../lib";

type ContratTravailData = {
  typeContratTravail: "cdi" | "cdd" | undefined;
  licenciementFauteGrave: "oui" | "non" | undefined;
  licenciementInaptitude: "oui" | "non" | undefined;
  errorTypeContratTravail: string | undefined;
  errorLicenciementFauteGrave: string | undefined;
  errorLicenciementInaptitude: string | undefined;
  errorCdd: boolean;
  errorFauteGrave: boolean;
  hasBeenSubmit: boolean;
  isStepValid: boolean;
};

const initialState: ContratTravailData = {
  typeContratTravail: undefined,
  licenciementFauteGrave: undefined,
  licenciementInaptitude: undefined,
  errorTypeContratTravail: undefined,
  errorLicenciementFauteGrave: undefined,
  errorLicenciementInaptitude: undefined,
  errorCdd: false,
  errorFauteGrave: false,
  hasBeenSubmit: false,
  isStepValid: true,
};

export const useContratTravailStore = create(
  combine(initialState, (set, get) => ({
    onChangeTypeContratTravail: (
      value: typeof initialState.typeContratTravail
    ) => {
      if (get().hasBeenSubmit) {
        const { isValid, newState } = validateStep({
          ...get(),
          typeContratTravail: value,
        });
        set((state) => ({
          ...state,
          ...newState,
          isStepValid: isValid,
          typeContratTravail: value,
        }));
      } else {
        set(() => ({ typeContratTravail: value }));
      }
    },
    onChangeLicenciementFauteGrave: (
      value: typeof initialState.licenciementFauteGrave
    ) => {
      if (get().hasBeenSubmit) {
        const { isValid, newState } = validateStep({
          ...get(),
          licenciementFauteGrave: value,
        });
        set((state) => ({
          ...state,
          ...newState,
          isStepValid: isValid,
          licenciementFauteGrave: value,
        }));
      } else {
        set(() => ({ licenciementFauteGrave: value }));
      }
    },
    onChangeLicenciementInaptitude: (
      value: typeof initialState.licenciementInaptitude
    ) => {
      if (get().hasBeenSubmit) {
        const { isValid, newState } = validateStep({
          ...get(),
          licenciementInaptitude: value,
        });
        set((state) => ({
          ...state,
          ...newState,
          isStepValid: isValid,
          licenciementInaptitude: value,
        }));
      } else {
        set(() => ({ licenciementInaptitude: value }));
      }
    },
    onValidateStep: () => {
      const { isValid, newState } = validateStep(get());
      set((state) => ({
        ...state,
        ...newState,
        hasBeenSubmit: true,
        isStepValid: isValid,
      }));
      return isValid;
    },
  }))
);

const isValidObject = {
  errorCdd: false,
  errorFauteGrave: false,
  errorLicenciementInaptitude: undefined,
  errorLicenciementFauteGrave: undefined,
  errorTypeContratTravail: undefined,
};

const validateStep = (state: ContratTravailData) => {
  const newState = {
    errorCdd: state.typeContratTravail === "cdd" ? true : false,
    errorFauteGrave: state.licenciementFauteGrave === "oui" ? true : false,
    errorLicenciementInaptitude: !state.licenciementInaptitude
      ? "Vous devez répondre à cette question"
      : undefined,
    errorLicenciementFauteGrave: !state.licenciementFauteGrave
      ? "Vous devez répondre à cette question"
      : undefined,
    errorTypeContratTravail: !state.typeContratTravail
      ? "Vous devez répondre à cette question"
      : undefined,
  };
  return { isValid: deepEqualObject(newState, isValidObject), newState };
};
