import { produce } from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { TypeContratStoreData, TypeContratStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";
import { findContractOption } from "../../../agreements";
import { TermeContratStoreSlice } from "../../TermeContrat/store";
import { mapToPublicodesSituationForEligibilityIndemnitePrecarite } from "../../../../common/publicodes/indemnite-precarite";

const initialState: TypeContratStoreData = {
  input: {
    contractOptionId: undefined,
  },
  error: {
    contractOptionId: undefined,
  },
  hasBeenSubmit: false,
  isStepValid: true,
  ineligibility: undefined,
};

const createTypeContratStore: StoreSliceWrapperIndemnitePrecarite<
  TypeContratStoreSlice,
  AgreementStoreSlice & TermeContratStoreSlice
> = (set, get) => ({
  typeContratData: {
    ...initialState,
  },
  typeContratFunction: {
    onContractOptionChange: (contractOptionId: string) => {
      set(
        produce((state: TypeContratStoreSlice & TermeContratStoreSlice) => {
          if (
            state.typeContratData.input.contractOptionId !== contractOptionId
          ) {
            // Les issues proposées à l'étape suivante dépendent de la famille
            // de contrat : on repart d'une saisie vierge.
            state.termeContratData.input.finALaDatePrevue = undefined;
            state.termeContratData.input.issueContrat = undefined;
            state.termeContratData.error = {};
            state.termeContratData.hasBeenSubmit = false;
            state.termeContratData.isStepValid = true;
            state.termeContratData.ineligibility = undefined;
          }
          state.typeContratData.input.contractOptionId = contractOptionId;
          state.typeContratData.ineligibility = undefined;
          if (state.typeContratData.hasBeenSubmit) {
            const { isValid, errorState } = validateStep(
              state.typeContratData.input
            );
            state.typeContratData.isStepValid = isValid;
            state.typeContratData.error = errorState;
          }
        })
      );
    },
    onNextStep: (): ValidationResponse => {
      const input = get().typeContratData.input;
      const { isValid, errorState } = validateStep(input);

      set(
        produce((state: TypeContratStoreSlice) => {
          state.typeContratData.hasBeenSubmit = true;
          state.typeContratData.isStepValid = isValid;
          state.typeContratData.error = errorState;
        })
      );

      if (!isValid) {
        return ValidationResponse.NotValid;
      }

      const option = findContractOption(
        input.contractOptionId,
        get().agreementData.input.agreement
      );

      // « Autres » regroupe les contrats exclus par le code du travail. C'est
      // le modèle publicodes qui tranche, comme à l'étape « Terme du contrat ».
      const ineligibility = option
        ? get().agreementData.publicodes?.ineligibility.getIneligibility(
            mapToPublicodesSituationForEligibilityIndemnitePrecarite({
              family: option.family,
              typeCdd: option.typeCdd,
            })
          )
        : undefined;

      set(
        produce((state: TypeContratStoreSlice) => {
          state.typeContratData.ineligibility = ineligibility;
        })
      );

      return ineligibility
        ? ValidationResponse.NotEligible
        : ValidationResponse.Valid;
    },
  },
});

export default createTypeContratStore;
