import { produce } from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { TermeContratStoreData, TermeContratStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { TypeContratStoreSlice } from "../../TypeContrat/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";
import { findContractOption } from "../../../agreements";
import { FinALaDatePrevue, IssueContrat } from "../../../types";
import { mapToPublicodesSituationForEligibilityIndemnitePrecarite } from "../../../../common/publicodes/indemnite-precarite";

const initialState: TermeContratStoreData = {
  input: {
    finALaDatePrevue: undefined,
    issueContrat: undefined,
  },
  error: {
    finALaDatePrevue: undefined,
    issueContrat: undefined,
  },
  hasBeenSubmit: false,
  isStepValid: true,
  ineligibility: undefined,
};

const createTermeContratStore: StoreSliceWrapperIndemnitePrecarite<
  TermeContratStoreSlice,
  AgreementStoreSlice & TypeContratStoreSlice
> = (set, get) => ({
  termeContratData: {
    ...initialState,
  },
  termeContratFunction: {
    onFinALaDatePrevueChange: (value: FinALaDatePrevue) => {
      set(
        produce((state: TermeContratStoreSlice) => {
          const hasChanged =
            state.termeContratData.input.finALaDatePrevue !== value;
          state.termeContratData.input.finALaDatePrevue = value;
          // Les issues proposées dépendent de la réponse : on repart de zéro.
          if (hasChanged) {
            state.termeContratData.input.issueContrat = undefined;
          }
          state.termeContratData.ineligibility = undefined;
          revalidate(state);
        })
      );
    },
    onIssueContratChange: (value: IssueContrat) => {
      set(
        produce((state: TermeContratStoreSlice) => {
          state.termeContratData.input.issueContrat = value;
          state.termeContratData.ineligibility = undefined;
          revalidate(state);
        })
      );
    },
    onNextStep: (): ValidationResponse => {
      const state = get();
      const input = state.termeContratData.input;
      const { isValid, errorState } = validateStep(input);

      if (!isValid) {
        set(
          produce((draft: TermeContratStoreSlice) => {
            draft.termeContratData.hasBeenSubmit = true;
            draft.termeContratData.isStepValid = false;
            draft.termeContratData.error = errorState;
            draft.termeContratData.ineligibility = undefined;
          })
        );
        return ValidationResponse.NotValid;
      }

      const option = findContractOption(
        state.typeContratData.input.contractOptionId,
        state.agreementData.input.agreement
      );

      // Le modèle publicodes est l'unique source de vérité sur l'éligibilité.
      const ineligibility = option
        ? state.agreementData.publicodes?.ineligibility.getIneligibility(
            mapToPublicodesSituationForEligibilityIndemnitePrecarite({
              family: option.family,
              typeCdd: option.typeCdd,
              finALaDatePrevue: input.finALaDatePrevue,
              issueContrat: input.issueContrat,
            })
          )
        : undefined;

      set(
        produce((draft: TermeContratStoreSlice) => {
          draft.termeContratData.hasBeenSubmit = true;
          draft.termeContratData.isStepValid = true;
          draft.termeContratData.error = errorState;
          draft.termeContratData.ineligibility = ineligibility;
        })
      );

      return ineligibility
        ? ValidationResponse.NotEligible
        : ValidationResponse.Valid;
    },
  },
});

const revalidate = (state: TermeContratStoreSlice) => {
  if (!state.termeContratData.hasBeenSubmit) return;
  const { isValid, errorState } = validateStep(state.termeContratData.input);
  state.termeContratData.isStepValid = isValid;
  state.termeContratData.error = errorState;
};

export default createTermeContratStore;
