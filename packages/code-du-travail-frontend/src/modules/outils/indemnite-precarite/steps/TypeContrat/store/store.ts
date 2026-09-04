import { produce } from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { TypeContratStoreData, TypeContratStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";
import { findContractOption } from "../../../agreements";
import { ContractOption } from "../../../types";
import { TermeContratStoreSlice } from "../../TermeContrat/store";
import { mapToPublicodesSituationForEligibilityIndemnitePrecarite } from "../../../../common/publicodes/indemnite-precarite";

type Slices = TypeContratStoreSlice &
  AgreementStoreSlice &
  TermeContratStoreSlice;

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

/**
 * L'option est toujours relue depuis la convention collective courante : un
 * identifiant orphelin (après un changement de convention) ne doit pas
 * laisser passer l'étape.
 */
const resolveOption = (state: Slices): ContractOption | undefined =>
  findContractOption(
    state.typeContratData.input.contractOptionId,
    state.agreementData.input.agreement
  );

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
        produce((state: Slices) => {
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
        })
      );

      if (!get().typeContratData.hasBeenSubmit) return;

      const { isValid, errorState } = validateStep(resolveOption(get()));
      set(
        produce((state: TypeContratStoreSlice) => {
          state.typeContratData.isStepValid = isValid;
          state.typeContratData.error = errorState;
        })
      );
    },
    onNextStep: (): ValidationResponse => {
      const option = resolveOption(get());
      const { isValid, errorState } = validateStep(option);

      set(
        produce((state: TypeContratStoreSlice) => {
          state.typeContratData.hasBeenSubmit = true;
          state.typeContratData.isStepValid = isValid;
          state.typeContratData.error = errorState;
        })
      );

      if (!option) {
        return ValidationResponse.NotValid;
      }

      // « Autres » regroupe les contrats exclus par le code du travail. C'est
      // le modèle publicodes qui tranche, comme à l'étape « Terme du contrat ».
      const ineligibility =
        get().agreementData.publicodes?.ineligibility.getIneligibility(
          mapToPublicodesSituationForEligibilityIndemnitePrecarite({
            family: option.family,
            typeCdd: option.typeCdd,
          })
        );

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
