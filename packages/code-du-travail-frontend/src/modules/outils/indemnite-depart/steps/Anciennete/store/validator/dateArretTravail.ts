import { isAfter, isBefore } from "date-fns";
import { parse } from "../../../../../common/utils";
import { AncienneteStoreError, AncienneteStoreInput } from "../types";

export const getDateArretTravailErrors = (
  state: AncienneteStoreInput
): Partial<AncienneteStoreError> => {
  const errors: AncienneteStoreError = {
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
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const dArret = parse(state.dateArretTravail);

  if (dArret && state.dateEntree && isBefore(dArret, dEntree)) {
    errors.errorDateEntree =
      "La date de début de contrat doit se situer avant la date d'arrêt de travail indiquée à l'étape n°2";
  }

  if (dArret && state.dateSortie && isAfter(dArret, dSortie)) {
    errors.errorDateSortie =
      "La date de fin de contrat doit se situer après la date d'arrêt de travail indiquée à l'étape n°2";
  }

  return errors;
};
