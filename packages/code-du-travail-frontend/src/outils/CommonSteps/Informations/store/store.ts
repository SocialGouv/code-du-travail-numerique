import { GetState, SetState } from "zustand";
import produce from "immer";
import { validateStep } from "./validator";

import {
  CommonInformationsStoreData,
  CommonInformationsStoreInput,
  CommonInformationsStoreSlice,
} from "./types";
import { StoreSlice } from "../../../types";
import { IndemniteLicenciementPublicodes } from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForIndemniteLicenciementConventionnel } from "../../../publicodes";
import { CommonAgreementStoreSlice } from "../../Agreement/store";

const initialState: CommonInformationsStoreData = {
  input: {
    informations: {},
    publicodesQuestions: [],
    isStepHidden: true,
    hasNoMissingVariables: false,
  },
  error: {
    errorInformations: {},
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createCommonInformationsStore: StoreSlice<
  CommonInformationsStoreSlice,
  CommonAgreementStoreSlice
> = (set, get, publicodesRules) => ({
  informationsData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  informationsFunction: {
    generatePublicodesQuestions: () => {
      const publicodes = get().informationsData.publicodes;
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }
      const agreement = get().agreementData.input.agreement;
      if (agreement) {
        const { missingArgs } = publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnel(
            agreement.num,
            0,
            0
          ),
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        if (missingArgs.length > 0) {
          set(
            produce((state: CommonInformationsStoreSlice) => {
              state.informationsData.input.publicodesQuestions =
                missingArgs.map((arg) => ({
                  name: arg.name,
                  rule: arg.rawNode,
                }));
              state.informationsData.input.isStepHidden = false;
            })
          );
          return;
        }
      }
      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.input = initialState.input;
        })
      );
    },
    onInformationsChange: (key, value) => {
      const currentInformations = get().informationsData.input.informations;
      const newObj = { ...currentInformations, [key]: value };
      applyGenericValidation(get, set, "informations", newObj);
      const publicodes = get().informationsData.publicodes!;
      const agreement = get().agreementData.input.agreement!;
      const { missingArgs } = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementConventionnel(
          agreement.num,
          0,
          0,
          newObj
        ),
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      if (missingArgs.length > 0) {
        set(
          produce((state: CommonInformationsStoreSlice) => {
            const newQuestion = missingArgs
              .sort((a, b) => b.indice - a.indice)
              .map((arg) => ({
                name: arg.name,
                rule: arg.rawNode,
              }))[0];
            const publicodesQuestions = [
              ...state.informationsData.input.publicodesQuestions,
              newQuestion,
            ].filter(
              (v, i) =>
                publicodesQuestions.findIndex((t) => t.name == v.name) === i
            );
            state.informationsData.input.publicodesQuestions =
              publicodesQuestions;
          })
        );
      } else {
        set(
          produce((state: CommonInformationsStoreSlice) => {
            state.informationsData.input.hasNoMissingVariables = true;
          })
        );
      }
    },
    onValidateStep: () => {
      const { isValid, errorState } = validateStep(
        get().informationsData.input
      );
      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = isValid ? false : true;
          state.informationsData.isStepValid =
            isValid && get().informationsData.input.hasNoMissingVariables;
          state.informationsData.error = errorState;
        })
      );
      return isValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<CommonInformationsStoreSlice>,
  set: SetState<CommonInformationsStoreSlice>,
  paramName: keyof CommonInformationsStoreInput,
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
      produce((state: CommonInformationsStoreSlice) => {
        state.informationsData.error = errorState;
        state.informationsData.isStepValid = isValid;
        state.informationsData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: CommonInformationsStoreSlice) => {
        state.informationsData.input[paramName] = value;
      })
    );
  }
};

export default createCommonInformationsStore;
