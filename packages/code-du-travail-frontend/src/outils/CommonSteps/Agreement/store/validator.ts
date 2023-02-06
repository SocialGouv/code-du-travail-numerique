import { deepEqualObject } from "../../../../lib";
import {
  CommonAgreementStoreError,
  CommonAgreementStoreInput,
  Route,
} from "./types";

export const validateStep = (state: CommonAgreementStoreInput) => {
  const errorState: CommonAgreementStoreError = {
    route: !state.route ? "Vous devez répondre à cette question" : undefined,
    agreement:
      state.route === Route.agreement && !state.agreement
        ? "Vous devez sélectionner une convention collective"
        : undefined,
    enterprise:
      state.route === Route.enterprise && !state.enterprise
        ? "Vous devez sélectionner une entreprise"
        : state.route === Route.enterprise &&
          state.enterprise &&
          !state.agreement
        ? "Vous devez sélectionner une convention collective"
        : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      route: undefined,
      agreement: undefined,
      enterprise: undefined,
    }),
    errorState,
  };
};
