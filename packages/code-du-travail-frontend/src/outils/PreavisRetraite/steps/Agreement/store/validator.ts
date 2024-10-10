import { deepEqualObject } from "../../../../../lib";
import { AgreementStoreError, AgreementStoreInput } from "./types";

export const validateStep = (state: AgreementStoreInput) => {
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
    errorPublicodes: state.informationError
      ? "Une erreur liée au moteur de calcul nous empêche de continuer la simulation. Veuillez vérifier les informations saisies ou rafraîchir la page si le problème persiste."
      : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      route: undefined,
      agreement: undefined,
      enterprise: undefined,
      errorPublicodes: undefined,
    }),
    errorState,
  };
};
