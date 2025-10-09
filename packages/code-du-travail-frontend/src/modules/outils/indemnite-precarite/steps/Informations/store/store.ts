import { StoreApi } from "zustand";
import produce from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { InformationsStoreData, InformationsStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep, EXCLUDED_CONTRACTS } from "./validator";
import { ContractType, CONTRACT_TYPE } from "../../../types";

const initialState: InformationsStoreData = {
  input: {
    contractType: undefined,
    criteria: {},
    // Questions CDD
    finContratPeriodeDessai: undefined,
    propositionCDIFindeContrat: undefined,
    refusCDIFindeContrat: undefined,
    interruptionFauteGrave: undefined,
    refusRenouvellementAuto: undefined,
    // Questions CTT
    cttFormation: undefined,
    ruptureContratFauteGrave: undefined,
    propositionCDIFinContrat: undefined,
    refusSouplesse: undefined,
    // Questions spécifiques aux conventions collectives
    hasCdiProposal: undefined,
    hasCdiRenewal: undefined,
    hasEquivalentCdiRenewal: undefined,
  },
  error: {
    contractType: undefined,
    // Erreurs CDD
    finContratPeriodeDessai: undefined,
    propositionCDIFindeContrat: undefined,
    refusCDIFindeContrat: undefined,
    interruptionFauteGrave: undefined,
    refusRenouvellementAuto: undefined,
    // Erreurs CTT
    cttFormation: undefined,
    ruptureContratFauteGrave: undefined,
    propositionCDIFinContrat: undefined,
    refusSouplesse: undefined,
    // Erreurs spécifiques aux conventions collectives
    hasCdiProposal: undefined,
    hasCdiRenewal: undefined,
    hasEquivalentCdiRenewal: undefined,
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createInformationsStore: StoreSliceWrapperIndemnitePrecarite<
  InformationsStoreSlice,
  AgreementStoreSlice
> = (set, get) => ({
  informationsData: {
    ...initialState,
  },
  informationsFunction: {
    onContractTypeChange: (contractType: ContractType) => {
      set(
        produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
          // If switching to CTT, reset cddType in criteria
          if (contractType === "CTT") {
            state.informationsData.input.criteria = {
              ...state.informationsData.input.criteria,
              cddType: undefined,
            };
          }

          // Reset questions CDD
          state.informationsData.input.finContratPeriodeDessai = undefined;
          state.informationsData.input.propositionCDIFindeContrat = undefined;
          state.informationsData.input.refusCDIFindeContrat = undefined;
          state.informationsData.input.interruptionFauteGrave = undefined;
          state.informationsData.input.refusRenouvellementAuto = undefined;
          // Reset questions CTT
          state.informationsData.input.cttFormation = undefined;
          state.informationsData.input.ruptureContratFauteGrave = undefined;
          state.informationsData.input.propositionCDIFinContrat = undefined;
          state.informationsData.input.refusSouplesse = undefined;
          // Reset questions spécifiques aux conventions collectives
          state.informationsData.input.hasCdiProposal = undefined;
          state.informationsData.input.hasCdiRenewal = undefined;
          state.informationsData.input.hasEquivalentCdiRenewal = undefined;
          // Reset erreurs
          state.informationsData.error.finContratPeriodeDessai = undefined;
          state.informationsData.error.propositionCDIFindeContrat = undefined;
          state.informationsData.error.refusCDIFindeContrat = undefined;
          state.informationsData.error.interruptionFauteGrave = undefined;
          state.informationsData.error.refusRenouvellementAuto = undefined;
          state.informationsData.error.cttFormation = undefined;
          state.informationsData.error.ruptureContratFauteGrave = undefined;
          state.informationsData.error.propositionCDIFinContrat = undefined;
          state.informationsData.error.refusSouplesse = undefined;
          // Reset erreurs spécifiques aux conventions collectives
          state.informationsData.error.hasCdiProposal = undefined;
          state.informationsData.error.hasCdiRenewal = undefined;
          state.informationsData.error.hasEquivalentCdiRenewal = undefined;
        })
      );
      applyGenericValidation(get, set, "contractType", contractType);
    },
    onCriteriaChange: (criteria: Record<string, any>) => {
      applyGenericValidation(get, set, "criteria", criteria);
    },
    onCDDQuestionChange: (questionKey: string, value: boolean) => {
      applyGenericValidation(get, set, questionKey, value);
    },
    onCTTQuestionChange: (questionKey: string, value: boolean) => {
      applyGenericValidation(get, set, questionKey, value);
    },
    onConventionQuestionChange: (questionKey: string, value: string) => {
      applyGenericValidation(get, set, questionKey, value);
    },
    onNextStep: (): ValidationResponse => {
      const state = get().informationsData.input;
      const agreement = get().agreementData.input.agreement;
      const { isValid, errorState } = validateStep(state, agreement);

      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = true;
          state.informationsData.isStepValid = isValid;
          state.informationsData.error = errorState;
        })
      );

      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<InformationsStoreSlice & AgreementStoreSlice>["getState"],
  set: StoreApi<InformationsStoreSlice & AgreementStoreSlice>["setState"],
  paramName: any,
  value: any
) => {
  if (get().informationsData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.informationsData.input[paramName] = value;
    });
    const agreement = get().agreementData?.input?.agreement;
    const { isValid, errorState } = validateStep(
      nextState.informationsData.input,
      agreement
    );
    set(
      produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
        state.informationsData.error = errorState;
        state.informationsData.isStepValid = isValid;
        state.informationsData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
        state.informationsData.input[paramName] = value;
      })
    );
  }
};

export default createInformationsStore;
