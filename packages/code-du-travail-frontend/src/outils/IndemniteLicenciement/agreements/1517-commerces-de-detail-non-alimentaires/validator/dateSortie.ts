import { differenceInMonths, isAfter } from "date-fns";
import { isValidDate } from "../../../../../lib";
import {
  AncienneteStoreInput,
  AncienneteStoreError,
} from "../../../steps/Anciennete/store";
import { parse } from "../../../../common/utils";

export const getDateSortieErrors = (
  state: AncienneteStoreInput
): Partial<AncienneteStoreError> => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);

  let errors: AncienneteStoreError = {};

  // Date de sortie
  if (!state.dateSortie) {
    errors.errorDateSortie = "Veuillez saisir cette date";
  } else if (state.dateSortie && differenceInMonths(new Date(), dSortie) > 18) {
    errors.errorDateSortie =
      "La date de fin de contrat doit se situer dans les 18 derniers mois";
  } else if (
    state.dateSortie &&
    state.dateEntree &&
    isAfter(dEntree, dSortie)
  ) {
    errors.errorDateSortie =
      "La date de fin de contrat doit se situer après la date de début de contrat";
  } else if (!isValidDate(state.dateSortie)) {
    errors.errorDateSortie = "La date de fin de contrat est invalide";
  } else {
    errors.errorDateSortie = undefined;
  }

  return errors;
};
