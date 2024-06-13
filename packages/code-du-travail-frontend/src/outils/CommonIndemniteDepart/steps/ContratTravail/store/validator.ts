import { deepEqualObject } from "../../../../../lib";
import { ContratTravailStoreError, ContratTravailStoreInput } from "./types";

const isCDI = (state) => state.typeContratTravail === "cdi";
export const validateStep = (state: ContratTravailStoreInput) => {
  const errorState: ContratTravailStoreError = {
    errorTypeContratTravail: !state.typeContratTravail
      ? "Vous devez répondre à cette question"
      : undefined,
    errorLicenciementFauteGrave:
      !state.licenciementFauteGrave && isCDI(state)
        ? "Vous devez répondre à cette question"
        : undefined,
    errorLicenciementInaptitude:
      !state.licenciementInaptitude &&
      isCDI(state) &&
      state.licenciementFauteGrave === "non"
        ? "Vous devez répondre à cette question"
        : undefined,
    errorArretTravail:
      !state.arretTravail &&
      isCDI(state) &&
      state.licenciementInaptitude === "non"
        ? "Vous devez répondre à cette question"
        : undefined,
    errorDateArretTravail:
      state.arretTravail === "oui" && isCDI(state) && !state.dateArretTravail
        ? "Vous devez répondre à cette question"
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
