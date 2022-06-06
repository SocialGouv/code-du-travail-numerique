import { deepEqualObject } from "../../../lib";
import { StoreSlice } from ".";

type ContratTravailStoreData = {
  typeContratTravail: "cdi" | "cdd" | undefined;
  licenciementFauteGrave: "oui" | "non" | undefined;
  licenciementInaptitude: "oui" | "non" | undefined;
  errorTypeContratTravail: string | undefined;
  errorLicenciementFauteGrave: string | undefined;
  errorLicenciementInaptitude: string | undefined;
  errorCdd: boolean;
  errorFauteGrave: boolean;
  hasBeenSubmitInfo: boolean;
  isStepInfoValid: boolean;
};

type ContratTravailStoreFn = {
  onChangeTypeContratTravail: (
    value: typeof initialState.typeContratTravail
  ) => void;
  onChangeLicenciementFauteGrave: (
    value: typeof initialState.licenciementFauteGrave
  ) => void;
  onChangeLicenciementInaptitude: (
    value: typeof initialState.licenciementInaptitude
  ) => void;
  onValidateStepInfo: () => boolean;
};

export type ContratTravailStoreSlice = ContratTravailStoreData &
  ContratTravailStoreFn;

const initialState: ContratTravailStoreData = {
  typeContratTravail: undefined,
  licenciementFauteGrave: undefined,
  licenciementInaptitude: undefined,
  errorTypeContratTravail: undefined,
  errorLicenciementFauteGrave: undefined,
  errorLicenciementInaptitude: undefined,
  errorCdd: false,
  errorFauteGrave: false,
  hasBeenSubmitInfo: false,
  isStepInfoValid: true,
};

export const createContratTravailStore: StoreSlice<ContratTravailStoreSlice> = (
  set,
  get
) => ({
  ...initialState,
  onChangeTypeContratTravail: (
    value: typeof initialState.typeContratTravail
  ) => {
    if (get().hasBeenSubmitInfo) {
      const { isValid, newState } = validateStep({
        ...get(),
        typeContratTravail: value,
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepInfoValid: isValid,
        typeContratTravail: value,
      }));
    } else {
      set(() => ({ typeContratTravail: value }));
    }
  },
  onChangeLicenciementFauteGrave: (
    value: typeof initialState.licenciementFauteGrave
  ) => {
    if (get().hasBeenSubmitInfo) {
      const { isValid, newState } = validateStep({
        ...get(),
        licenciementFauteGrave: value,
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepInfoValid: isValid,
        licenciementFauteGrave: value,
      }));
    } else {
      set(() => ({ licenciementFauteGrave: value }));
    }
  },
  onChangeLicenciementInaptitude: (
    value: typeof initialState.licenciementInaptitude
  ) => {
    if (get().hasBeenSubmitInfo) {
      const { isValid, newState } = validateStep({
        ...get(),
        licenciementInaptitude: value,
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepInfoValid: isValid,
        licenciementInaptitude: value,
      }));
    } else {
      set(() => ({ licenciementInaptitude: value }));
    }
  },
  onValidateStepInfo: () => {
    const { isValid, newState } = validateStep(get());
    set((state) => ({
      ...state,
      ...newState,
      hasBeenSubmitInfo: true,
      isStepInfoValid: isValid,
    }));
    return isValid;
  },
});

const validateStep = (state: ContratTravailStoreData) => {
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
  return {
    isValid: deepEqualObject(newState, {
      errorCdd: false,
      errorFauteGrave: false,
      errorLicenciementInaptitude: undefined,
      errorLicenciementFauteGrave: undefined,
      errorTypeContratTravail: undefined,
    }),
    newState,
  };
};
