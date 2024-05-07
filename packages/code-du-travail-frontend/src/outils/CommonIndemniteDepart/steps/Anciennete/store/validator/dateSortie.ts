import { format, isAfter } from "date-fns";
import { isValidDate } from "../../../../../../lib";
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
  } else if (
    state.dateEntree &&
    state.dateSortie &&
    isAfter(dEntree, dSortie)
  ) {
    errors.errorDateSortie = `La date de fin de contrat doit se situer après le <strong>${format(
      dEntree,
      "dd MMMM yyyy",
      {
        locale: frLocale,
      }
    )}</strong>`;
  } else if (!isValidDate(state.dateSortie)) {
    errors.errorDateSortie = "La date de fin de contrat est invalide";
  } else {
    errors.errorDateSortie = undefined;
  }

  return errors;
};
