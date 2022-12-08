import produce from "immer";
import { StoreApi } from "zustand";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement16StoreData,
  Agreement16StoreInput,
  Agreement16StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";

const initialState: Agreement16StoreData = {
  input: {
    showVariablePay: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement16StoreSalaires: StoreSlice<
  Agreement16StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  agreement16Data: { ...initialState },
  agreement16Function: {
    onInit: () => {
      const categoryPro = get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - transports routiers - indemnité de licenciement - catégorie professionnelle"
      )?.info;
      set(
        produce((state: Agreement16StoreSlice) => {
          state.agreement16Data.input.showVariablePay =
            get().salairesData.input.hasSameSalary === "non" &&
            (categoryPro === "'Ingénieurs et cadres'" ||
              categoryPro === "'TAM'");
        })
      );
    },
    onChangeHasVariablePay: (value) => {
      applyGenericValidation(get, set, "hasVariablePay", value);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement16StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement16StoreSlice & SalairesStoreSlice>["setState"],
  paramName: keyof Agreement16StoreInput,
  value: any
) => {
  if (get().agreement16Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement16Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement16Data.input
    );
    set(
      produce((state: Agreement16StoreSlice) => {
        state.agreement16Data.error = errorState;
        state.agreement16Data.isStepValid = isValid;
        state.agreement16Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStepSalaires();
  } else {
    set(
      produce((state: Agreement16StoreSlice) => {
        state.agreement16Data.input[paramName] = value;
      })
    );
  }
};
