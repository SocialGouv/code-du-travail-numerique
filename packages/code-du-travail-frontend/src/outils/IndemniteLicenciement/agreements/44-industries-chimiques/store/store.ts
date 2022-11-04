import produce from "immer";
import { GetState, SetState } from "zustand";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement44StoreData,
  Agreement44StoreInput,
  Agreement44StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";

const initialState: Agreement44StoreData = {
  input: {
    showVariablePay: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement44StoreSalaires: StoreSlice<
  Agreement44StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  agreement44Data: { ...initialState },
  agreement44Function: {
    onInit: () => {
      const categoryPro =
        get().informationsData.input.publicodesInformations.find(
          (item) =>
            item.question.name ===
            "contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle"
        )?.info;
      set(
        produce((state: Agreement44StoreSlice) => {
          state.agreement44Data.input.showVariablePay =
            get().salairesData.input.hasSameSalary === "non" &&
            (categoryPro === "'Ouvriers et collaborateurs (Groupes I à III)'" ||
              categoryPro ===
                "'Agents de maîtrise et techniciens (Groupe IV)'");
          state.agreement44Data.input.hasVariablePay =
            get().salairesData.input.hasSameSalary === "oui" ||
            categoryPro === "'Ingénieurs et cadres (Groupe V)'"
              ? undefined
              : state.agreement44Data.input.hasVariablePay;
        })
      );
    },
    onChangeHasVariablePay: (value) => {
      applyGenericValidation(get, set, "hasVariablePay", value);
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement44StoreSlice & SalairesStoreSlice>,
  set: SetState<Agreement44StoreSlice & SalairesStoreSlice>,
  paramName: keyof Agreement44StoreInput,
  value: any
) => {
  if (get().agreement44Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement44Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement44Data.input
    );
    set(
      produce((state: Agreement44StoreSlice) => {
        state.agreement44Data.error = errorState;
        state.agreement44Data.isStepValid = isValid;
        state.agreement44Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onValidateStepSalaires();
  } else {
    set(
      produce((state: Agreement44StoreSlice) => {
        state.agreement44Data.input[paramName] = value;
      })
    );
  }
};
