import { StoreApi } from "zustand";
import { produce } from "immer";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import {
  AgreementConditionKey,
  CddConditionKey,
  CttConditionKey,
  DisqualificationReason,
  InformationsStoreData,
  InformationsStoreSlice,
} from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { computeDisqualificationReason, validateStep } from "./validator";
import { ContractType } from "../../../types";

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
    criteria: undefined,
  },
  hasBeenSubmit: false,
  isStepValid: true,
  disqualificationReason: undefined,
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
          state.informationsData.error = {
            contractType: undefined,
            criteria: undefined,
          };
          // Reset disqualification reason
          state.informationsData.disqualificationReason = undefined;
        })
      );
      applyGenericValidation(get, set, "contractType", contractType);
    },
    onCriteriaChange: (criteria: Record<string, any>) => {
      // Reset conditions tied to cddType when cddType changes
      set(
        produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
          state.informationsData.input.criteria = criteria;
          state.informationsData.disqualificationReason = undefined;
        })
      );
      applyGenericValidation(get, set, "criteria", criteria);
    },
    onCDDQuestionChange: (questionKey: CddConditionKey, checked: boolean) => {
      const value = checked ? true : undefined;
      applyGenericValidation(get, set, questionKey, value);
    },
    onCTTQuestionChange: (questionKey: CttConditionKey, checked: boolean) => {
      const value = checked ? true : undefined;
      applyGenericValidation(get, set, questionKey, value);
    },
    onConventionQuestionChange: (
      questionKey: AgreementConditionKey,
      checked: boolean
    ) => {
      const value = checked ? true : undefined;
      applyGenericValidation(get, set, questionKey, value);
    },
    onNextStep: (): ValidationResponse => {
      const input = get().informationsData.input;
      const agreement = get().agreementData.input.agreement;
      const { isValid, errorState } = validateStep(input);

      if (!isValid) {
        set(
          produce((state: InformationsStoreSlice) => {
            state.informationsData.hasBeenSubmit = true;
            state.informationsData.isStepValid = false;
            state.informationsData.error = errorState;
            state.informationsData.disqualificationReason = undefined;
          })
        );
        return ValidationResponse.NotValid;
      }

      const reason: DisqualificationReason | undefined =
        computeDisqualificationReason(input, agreement);

      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = true;
          state.informationsData.isStepValid = true;
          state.informationsData.error = errorState;
          state.informationsData.disqualificationReason = reason;
        })
      );

      return reason ? ValidationResponse.NotEligible : ValidationResponse.Valid;
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
    const { isValid, errorState } = validateStep(
      nextState.informationsData.input
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
