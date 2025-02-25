import {
  differenceInMonths,
  format,
  isAfter,
  isEqual,
  isValid,
} from "date-fns";
import { parse } from "../../../../../common/utils";
import { AncienneteStoreError, AncienneteStoreInput } from "../types";
import frLocale from "date-fns/locale/fr";

export const getDateSortieErrors = (
  state: AncienneteStoreInput
): Partial<AncienneteStoreError> => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  let errors: AncienneteStoreError = {};

  if (!state.dateSortie) {
    errors.errorDateSortie = "Veuillez saisir cette date";
  } else if (!isValid(dSortie)) {
    errors.errorDateSortie = "La date de sortie est invalide";
  } else if (
    state.dateEntree &&
    state.dateSortie &&
    (isAfter(dEntree, dSortie) || isEqual(dEntree, dSortie))
  ) {
    errors.errorDateSortie = `La date de fin de contrat doit se situer après le <strong>${format(
      dEntree,
      "dd MMMM yyyy",
      {
        locale: frLocale,
      }
    )}</strong>`;
  } else if (
    state.dateNotification &&
    differenceInMonths(new Date(), dSortie) > 18
  ) {
    errors.errorDateSortie =
      "La date de sortie doit se situer dans les 18 derniers mois";
  } else {
    errors.errorDateSortie = undefined;
  }

  return errors;
};
