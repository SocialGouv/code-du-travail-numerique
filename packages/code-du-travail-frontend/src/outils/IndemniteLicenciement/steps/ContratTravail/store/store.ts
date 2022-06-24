import { GetState, SetState } from "zustand";
import {
  ContratTravailStoreData,
  ContratTravailStoreInput,
  ContratTravailStoreSlice,
} from "./types";
import produce from "immer";
import { StoreSlice } from "../../../store";
import { validateStep } from "./validator";
import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import { IndemniteLicenciementStepName } from "../../..";
import { validateAgreement } from "../../../agreements";

const initialState: ContratTravailStoreData = {
  input: {},
  error: {
    errorCdd: false,
    errorFauteGrave: false,
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createContratTravailStore: StoreSlice<ContratTravailStoreSlice> = (
  set,
  get
) => ({
  contratTravailData: { ...initialState },
  contratTravailFunction: {
    onChangeTypeContratTravail: (value) => {
      applyGenericValidation(get, set, "typeContratTravail", value);
    },
    onChangeLicenciementFauteGrave: (value) => {
      applyGenericValidation(get, set, "licenciementFauteGrave", value);
    },
    onChangeLicenciementInaptitude: (value) => {
      applyGenericValidation(get, set, "licenciementInaptitude", value);
    },
    onValidateStepInfo: () => {
      const { isValid, errorState } = validateStep(
        get().contratTravailData.input
      );

      const isAgreementValid = validateAgreement(
        SupportedCcIndemniteLicenciement.IDCC1516, //TODO: replace par la bonne CC
        IndemniteLicenciementStepName.ContratTravail,
        get,
        set
      );

      set(
        produce((state: ContratTravailStoreSlice) => {
          state.contratTravailData.hasBeenSubmit = isValid ? false : true;
          state.contratTravailData.isStepValid = isValid;
          state.contratTravailData.error = errorState;
        })
      );
      return isValid && isAgreementValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<ContratTravailStoreSlice>,
  set: SetState<ContratTravailStoreSlice>,
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
