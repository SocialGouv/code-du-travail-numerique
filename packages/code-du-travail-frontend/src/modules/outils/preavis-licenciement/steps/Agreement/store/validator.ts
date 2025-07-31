import { deepEqualObject } from "src/lib";
import { AgreementStoreError, AgreementStoreInput } from "./types";

export const validateAgreementStepWithState = (state: AgreementStoreInput) => {
  const errorState: AgreementStoreError = {
    route: !state.route ? "Vous devez répondre à cette question" : undefined,
    agreement:
      state.route === "agreement" && !state.agreement
        ? "Vous devez sélectionner une convention collective"
        : undefined,
    enterprise:
      state.route === "enterprise" &&
      !state.enterprise &&
      !(state.agreement && state.agreement.num === 3239)
        ? "Vous devez sélectionner une entreprise"
        : state.route === "enterprise" &&
            state.enterprise &&
            state.enterprise.conventions.length !== 0 &&
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
