import { deepEqualObject, isValidDate } from "../../../../../lib";
import { ContratTravailStoreInput, ContratTravailStoreError } from "./types";

export const validateStep = (state: ContratTravailStoreInput) => {
  const errorState: ContratTravailStoreError = {
    errorLicenciementInaptitude: !state.licenciementInaptitude
      ? "Vous devez répondre à cette question"
      : undefined,
    errorLicenciementFauteGrave: !state.licenciementFauteGrave
      ? "Vous devez répondre à cette question"
      : undefined,
    errorTypeContratTravail: !state.typeContratTravail
      ? "Vous devez répondre à cette question"
      : undefined,
    errorArretTravail:
      state.licenciementInaptitude === "oui" && !state.arretTravail
        ? "Vous devez répondre à cette question"
        : undefined,
    errorDateArretTravail:
      state.arretTravail === "oui" && !state.dateArretTravail
        ? "Vous devez répondre à cette question"
        : state.arretTravail === "oui" &&
          state.dateArretTravail &&
          !isValidDate(state.dateArretTravail)
        ? "La date doit être valide"
        : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      errorLicenciementInaptitude: undefined,
      errorLicenciementFauteGrave: undefined,
      errorTypeContratTravail: undefined,
      errorArretTravail: undefined,
      errorDateArretTravail: undefined,
    }),
    errorState,
  };
};
