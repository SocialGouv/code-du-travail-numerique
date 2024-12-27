import { differenceInMonths, isAfter, isValid } from "date-fns";
import { parse } from "../../../../../../common/utils";
import { AncienneteStoreError, AncienneteStoreInput } from "../types";

export const getDateNotificationErrors = (
  state: AncienneteStoreInput
): Partial<AncienneteStoreError> => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const dNotification = parse(state.dateNotification);
  let errors: AncienneteStoreError = {};

  // Date de notification
  if (!state.dateNotification) {
    errors.errorDateNotification = "Veuillez saisir cette date";
  } else if (!isValid(dNotification)) {
    errors.errorDateNotification = "La date de notification est invalide";
  } else if (
    state.dateNotification &&
    differenceInMonths(new Date(), dNotification) > 18
  ) {
    errors.errorDateNotification =
      "La date de notification doit se situer dans les 18 derniers mois";
  } else if (
    state.dateNotification &&
    state.dateSortie &&
    isAfter(dNotification, dSortie)
  ) {
    errors.errorDateNotification =
      "La date de notification doit se situer avant la date de fin de contrat";
  } else if (
    state.dateNotification &&
    state.dateEntree &&
    isAfter(dEntree, dNotification)
  ) {
    errors.errorDateNotification =
      "La date de notification doit se situer après la date de début de contrat";
  } else {
    errors.errorDateNotification = undefined;
  }

  return errors;
};
