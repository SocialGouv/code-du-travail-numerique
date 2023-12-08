import produce from "immer";
import { GetState, SetState } from "zustand";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement2120StoreData,
  Agreement2120StoreInput,
  Agreement2120StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";

const initialState: Agreement2120StoreData = {
  input: {
    salariesVariablePart: undefined,
    isLicenciementDisciplinaire: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement2120StoreSalaires: StoreSlice<
  Agreement2120StoreSlice,
  SalairesStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  agreement2120Data: { ...initialState },
  agreement2120Function: {
    init: () => {
      const isLicenciementDisciplinaire =
        get()
          .informationsData.input.publicodesInformations.find(
            (v) =>
              v.question.rule.nom ===
              "contrat salarié . convention collective . banque . licenciement disciplinaire"
          )
          ?.info?.slice(1, -1) === "Oui";

      set(
        produce((state: Agreement2120StoreSlice) => {
          state.agreement2120Data.input.isLicenciementDisciplinaire =
            isLicenciementDisciplinaire;
        })
      );
    },
    onChangeSalariesVariablePart: (value: string) => {
      const valueNumber = parseInt(value, 10);
      applyGenericValidation(
        get,
        set,
        "salariesVariablePart",
        isNaN(valueNumber) ? undefined : valueNumber
      );
    },
  },
});

const applyGenericValidation = (
  get: GetState<Agreement2120StoreSlice & SalairesStoreSlice>,
  set: SetState<Agreement2120StoreSlice & SalairesStoreSlice>,
  paramName: keyof Agreement2120StoreInput,
  value: any
) => {
  if (get().agreement2120Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.agreement2120Data.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement2120Data.input
    );

    set(
      produce((state: Agreement2120StoreSlice) => {
        state.agreement2120Data.error = errorState;
        state.agreement2120Data.isStepValid = isValid;
        state.agreement2120Data.input[paramName] = value;
      })
    );
    get().salairesFunction.onNextStep();
  } else {
    set(
      produce((state: Agreement2120StoreSlice) => {
        state.agreement2120Data.input[paramName] = value;
      })
    );
  }
};