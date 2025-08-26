import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { deepEqualObject } from "src/modules/utils/object";
import { AgreementStoreError, AgreementStoreInput } from "./types";
import isCcFullySupported from "src/modules/outils/common/utils/isCcFullySupported";

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
    unsupportedAgreement: !state.agreement
      ? "Si aucune convention collective n'est sélectionnée, vous ne pouvez pas continuer la simulation"
      : state.agreement &&
          !isCcFullySupported(
            state.agreement?.num,
            PublicodesSimulator.HEURES_RECHERCHE_EMPLOI
          )
        ? "La simulation ne peut pas se poursuivre avec cette convention collective"
        : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      route: undefined,
      agreement: undefined,
      enterprise: undefined,
      errorPublicodes: undefined,
      unsupportedAgreement: undefined,
    }),
    errorState,
  };
};
