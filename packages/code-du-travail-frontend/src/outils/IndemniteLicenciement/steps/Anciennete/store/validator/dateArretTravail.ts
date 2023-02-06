import { isAfter, isBefore } from "date-fns";
import { parse } from "../../../../../common/utils";
import { ContratTravailStoreInput } from "../../../ContratTravail/store";
import { AncienneteStoreError, AncienneteStoreInput } from "../types";

function getDateArret(stateContratTravail: ContratTravailStoreInput) {
  return stateContratTravail.arretTravail === "oui" &&
    stateContratTravail.dateArretTravail
    ? parse(stateContratTravail.dateArretTravail)
    : null;
}

export const getDateArretTravailErrors = (
  state: AncienneteStoreInput,
  stateContratTravail: ContratTravailStoreInput
): Partial<AncienneteStoreError> => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const dArret = getDateArret(stateContratTravail);
  let errors: AncienneteStoreError = {};

  if (dArret && state.dateEntree && isBefore(dArret, dEntree)) {
    errors.errorDateEntree =
      "La date de début de contrat doit se situer avant la date d'arrêt de travail indiquée à l'étape n°2";
  } else if (dArret && state.dateEntree && isAfter(dArret, dEntree)) {
    errors.errorDateEntree = undefined;
  }

  if (dArret && state.dateSortie && isAfter(dArret, dSortie)) {
    errors.errorDateSortie =
      "La date de fin de contrat doit se situer après la date d'arrêt de travail indiquée à l'étape n°2";
  } else if (dArret && state.dateSortie && isBefore(dArret, dSortie)) {
    errors.errorDateSortie = undefined;
  }

  return errors;
};
