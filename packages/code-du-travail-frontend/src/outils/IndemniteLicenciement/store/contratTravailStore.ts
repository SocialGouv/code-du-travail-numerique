import { deepEqualObject } from "../../../lib";
import { StoreSlice } from ".";

type ContratTravailStoreInput = {
  typeContratTravail: "cdi" | "cdd";
  licenciementFauteGrave: "oui" | "non";
  licenciementInaptitude: "oui" | "non";
};

type ContratTravailStoreError = {
  errorTypeContratTravail?: string;
  errorLicenciementFauteGrave?: string;
  errorLicenciementInaptitude?: string;
  errorCdd: boolean;
  errorFauteGrave: boolean;
};

type ContratTravailStoreData = {
  inputContratTravail: Partial<ContratTravailStoreInput>;
  errorContratTravail: ContratTravailStoreError;
  hasBeenSubmitInfo: boolean;
  isStepInfoValid: boolean;
};

type ContratTravailStoreFn = {
  onChangeTypeContratTravail: (
    value: typeof initialState.inputContratTravail.typeContratTravail
  ) => void;
  onChangeLicenciementFauteGrave: (
    value: typeof initialState.inputContratTravail.licenciementFauteGrave
  ) => void;
  onChangeLicenciementInaptitude: (
    value: typeof initialState.inputContratTravail.licenciementInaptitude
  ) => void;
  onValidateStepInfo: () => boolean;
};

export type ContratTravailStoreSlice = ContratTravailStoreData &
  ContratTravailStoreFn;

const initialState: ContratTravailStoreData = {
  inputContratTravail: {},
  errorContratTravail: {
    errorCdd: false,
    errorFauteGrave: false,
  },
  hasBeenSubmitInfo: false,
  isStepInfoValid: true,
};

export const createContratTravailStore: StoreSlice<ContratTravailStoreSlice> = (
  set,
  get
) => ({
  ...initialState,
  onChangeTypeContratTravail: (value) => {
    if (get().hasBeenSubmitInfo) {
      const { isValid, newState } = validateStep({
        ...get(),
        inputContratTravail: {
          ...get().inputContratTravail,
          typeContratTravail: value,
        },
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepInfoValid: isValid,
        inputContratTravail: {
          ...get().inputContratTravail,
          typeContratTravail: value,
        },
      }));
    } else {
      set(() => ({
        inputContratTravail: {
          ...get().inputContratTravail,
          typeContratTravail: value,
        },
      }));
    }
  },
  onChangeLicenciementFauteGrave: (value) => {
    if (get().hasBeenSubmitInfo) {
      const { isValid, newState } = validateStep({
        ...get(),
        inputContratTravail: {
          ...get().inputContratTravail,
          licenciementFauteGrave: value,
        },
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepInfoValid: isValid,
        inputContratTravail: {
          ...get().inputContratTravail,
          licenciementFauteGrave: value,
        },
      }));
    } else {
      set(() => ({
        inputContratTravail: {
          ...get().inputContratTravail,
          licenciementFauteGrave: value,
        },
      }));
    }
  },
  onChangeLicenciementInaptitude: (value) => {
    if (get().hasBeenSubmitInfo) {
      const { isValid, newState } = validateStep({
        ...get(),
        inputContratTravail: {
          ...get().inputContratTravail,
          licenciementInaptitude: value,
        },
      });
      set((state) => ({
        ...state,
        ...newState,
        isStepInfoValid: isValid,
        inputContratTravail: {
          ...get().inputContratTravail,
          licenciementInaptitude: value,
        },
      }));
    } else {
      set(() => ({
        inputContratTravail: {
          ...get().inputContratTravail,
          licenciementInaptitude: value,
        },
      }));
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
  const newState: Partial<ContratTravailStoreData> = {
    errorContratTravail: {
      errorCdd:
        state.inputContratTravail.typeContratTravail === "cdd" ? true : false,
      errorFauteGrave:
        state.inputContratTravail.licenciementFauteGrave === "oui"
          ? true
          : false,
      errorLicenciementInaptitude: !state.inputContratTravail
        .licenciementInaptitude
        ? "Vous devez répondre à cette question"
        : undefined,
      errorLicenciementFauteGrave: !state.inputContratTravail
        .licenciementFauteGrave
        ? "Vous devez répondre à cette question"
        : undefined,
      errorTypeContratTravail: !state.inputContratTravail.typeContratTravail
        ? "Vous devez répondre à cette question"
        : undefined,
    },
  };
  return {
    isValid: deepEqualObject(newState, {
      errorContratTravail: {
        errorCdd: false,
        errorFauteGrave: false,
        errorLicenciementInaptitude: undefined,
        errorLicenciementFauteGrave: undefined,
        errorTypeContratTravail: undefined,
      },
    }),
    newState,
  };
};
