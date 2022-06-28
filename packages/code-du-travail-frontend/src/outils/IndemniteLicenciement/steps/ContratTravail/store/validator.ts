import { deepEqualObject } from "../../../../../lib";
import { ContratTravailStoreInput, ContratTravailStoreError } from "./types";

export const validateStep = (state: ContratTravailStoreInput) => {
  const errorState: ContratTravailStoreError = {
    errorCdd: state.typeContratTravail === "cdd" ? true : false,
    errorFauteGrave: state.licenciementFauteGrave === "oui" ? true : false,
    errorLicenciementInaptitude: !state.licenciementInaptitude
      ? "Vous devez répondre à cette question"
      : undefined,
    errorLicenciementFauteGrave: !state.licenciementFauteGrave
      ? "Vous devez répondre à cette question"
      : undefined,
    errorTypeContratTravail: !state.typeContratTravail
      ? "Vous devez répondre à cette question"
      : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      errorCdd: false,
      errorFauteGrave: false,
      errorLicenciementInaptitude: undefined,
      errorLicenciementFauteGrave: undefined,
      errorTypeContratTravail: undefined,
    }),
    errorState,
  };
};
