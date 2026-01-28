import { deepEqualObject } from "src/modules/utils/object";
import { ContratTravailStoreError, ContratTravailStoreInput } from "./types";

export const validateStep = (state: ContratTravailStoreInput) => {
  const errorState: ContratTravailStoreError = {
    errorLicenciementInaptitude: !state.licenciementInaptitude
      ? "Vous devez répondre à cette question"
      : undefined,
    errorArretTravail:
      !state.arretTravail && state.licenciementInaptitude === "non"
        ? "Vous devez répondre à cette question"
        : undefined,
    errorDateArretTravail:
      state.arretTravail === "oui" && !state.dateArretTravail
        ? "Vous devez répondre à cette question"
        : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      errorLicenciementInaptitude: undefined,
      errorArretTravail: undefined,
      errorDateArretTravail: undefined,
    }),
    errorState,
  };
};
