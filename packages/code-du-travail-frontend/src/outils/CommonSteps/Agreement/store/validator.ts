import { deepEqualObject } from "../../../../lib";
import { CommonAgreementStoreError, CommonAgreementStoreInput } from "./types";

export const validateStep = (state: CommonAgreementStoreInput) => {
  const errorState: CommonAgreementStoreError = {
    route: !state.route ? "Vous devez répondre à cette question" : undefined,
    agreement:
      state.route === "agreement" && !state.agreement
        ? "Vous devez sélectionner une convention collective"
        : undefined,
    enterprise:
      state.route === "enterprise" && !state.enterprise
        ? "Vous devez sélectionner une entreprise"
        : state.route === "enterprise" && state.enterprise && !state.agreement
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
