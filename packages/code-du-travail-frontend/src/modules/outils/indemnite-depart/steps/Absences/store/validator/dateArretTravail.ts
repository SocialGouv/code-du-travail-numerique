import { isAfter, isBefore } from "date-fns";
import { parse } from "../../../../../common/utils";
import { AbsenceStoreError, AbsenceStoreInput } from "../types";
import { AncienneteStoreInput } from "../../../Anciennete";

export const getDateArretTravailErrors = (
  state: AbsenceStoreInput,
  ancienneteState: AncienneteStoreInput
): Partial<AbsenceStoreError> => {
  const errors: AbsenceStoreError = {
    errorDateArretTravail: undefined,
    errorArretTravail: undefined,
  };
  if (!state.arretTravail) {
    errors.errorArretTravail = "Vous devez répondre à cette question";
  }
  if (state.arretTravail === "oui" && !state.dateArretTravail) {
    errors.errorDateArretTravail = "Vous devez répondre à cette question";
  }
  if (state.arretTravail === "non") {
    return errors;
  }
  const dEntree = parse(ancienneteState.dateEntree);
  const dSortie = parse(ancienneteState.dateSortie);
  const dArret = parse(state.dateArretTravail);

  if (dArret && ancienneteState.dateEntree && isBefore(dArret, dEntree)) {
    errors.errorDateArretTravail = `La date de l'arrêt de travail doit se situer après la date de début du contrat (${ancienneteState.dateEntree}) indiquée à l'étape précédente`;
  }

  if (dArret && ancienneteState.dateSortie && isAfter(dArret, dSortie)) {
    errors.errorDateArretTravail = `La date de l'arrêt de travail doit se situer après la date de fin du contrat (${ancienneteState.dateSortie}) indiquée à l'étape précédente`;
  }

  return errors;
};
