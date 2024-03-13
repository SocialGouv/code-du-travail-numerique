import { deepEqualObject, isValidDate } from "../../../../../lib";
import { ContratTravailStoreError, ContratTravailStoreInput } from "./types";

export const validateStep = (state: ContratTravailStoreInput) => {
  const errorState: ContratTravailStoreError = {
    errorTypeContratTravail: !state.typeContratTravail
      ? "Vous devez répondre à cette question"
      : undefined,
    errorLicenciementFauteGrave:
      !state.licenciementFauteGrave && state.typeContratTravail === "cdi"
        ? "Vous devez répondre à cette question"
        : undefined,
    errorLicenciementInaptitude:
      !state.licenciementInaptitude && state.licenciementFauteGrave === "non"
        ? "Vous devez répondre à cette question"
        : undefined,
    errorArretTravail:
      state.licenciementInaptitude === "non" && !state.arretTravail
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
