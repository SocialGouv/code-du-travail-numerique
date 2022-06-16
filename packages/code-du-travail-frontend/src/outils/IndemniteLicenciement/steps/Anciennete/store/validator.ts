import { isAfter, format, differenceInMonths } from "date-fns";
import { isValidDate, deepEqualObject } from "../../../../../lib";
import { parse } from "../../../../common/utils";
import { MOTIFS } from "../components/AbsencePeriods";
import { AncienneteStoreInput, AncienneteStoreError } from "./types";
import frLocale from "date-fns/locale/fr";

export const validateStep = (state: AncienneteStoreInput) => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const dNotification = parse(state.dateNotification);
  const absencePeriods = state.absencePeriods;
  let errors: AncienneteStoreError = {};

  const totalAbsence =
    absencePeriods
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        if (!item.durationInMonth) {
          return total;
        }
        const v =
          MOTIFS.find((motif) => motif.label === item.motif)?.value ?? 0;
        return total + item.durationInMonth * v;
      }, 0) / 12;

  // Date d'entrée
  if (!state.dateEntree) {
    errors.errorDateEntree = "Veuillez saisir cette date";
  } else if (!isValidDate(state.dateEntree)) {
    errors.errorDateEntree = "La date d'entrée est invalide";
  } else {
    errors.errorDateEntree = undefined;
  }

  // Date de sortie
  if (!state.dateSortie) {
    errors.errorDateSortie = "Veuillez saisir cette date";
  } else if (
    state.dateEntree &&
    state.dateSortie &&
    isAfter(dEntree, dSortie)
  ) {
    errors.errorDateSortie = `La date de sortie doit se situer après le <strong>${format(
      dEntree,
      "dd MMMM yyyy",
      {
        locale: frLocale,
      }
    )}</strong>`;
  } else if (!isValidDate(state.dateSortie)) {
    errors.errorDateSortie = "La date de sortie est invalide";
  } else {
    errors.errorDateSortie = undefined;
  }

  // Date de notification
  if (!state.dateNotification) {
    errors.errorDateNotification = "Veuillez saisir cette date";
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
      "La date de notification doit se situer avant la date de sortie";
  } else if (
    state.dateNotification &&
    state.dateEntree &&
    isAfter(dEntree, dNotification)
  ) {
    errors.errorDateNotification =
      "La date de notification doit se situer après la date d’entrée";
  } else if (
    state.dateEntree &&
    state.dateNotification &&
    differenceInMonths(dNotification, dEntree) - totalAbsence < 8
  ) {
    errors.errorDateNotification =
      "L’indemnité de licenciement est dûe au-delà de 8 mois d’ancienneté";
  } else if (!isValidDate(state.dateNotification)) {
    errors.errorDateNotification = "La date de notification est invalide";
  } else {
    errors.errorDateNotification = undefined;
  }

  if (state.hasAbsenceProlonge === undefined) {
    errors.errorAbsenceProlonge = "Vous devez répondre à cette question";
  } else {
    errors.errorAbsenceProlonge = undefined;
  }

  if (
    state.hasAbsenceProlonge === "oui" &&
    (state.absencePeriods.find((v) => !v.durationInMonth) ||
      state.absencePeriods.length === 0)
  ) {
    errors.errorAbsencePeriods = "Vous devez renseigner tous les champs";
  } else {
    errors.errorAbsencePeriods = undefined;
  }

  return {
    isValid: deepEqualObject(errors, {
      errorAbsenceProlonge: undefined,
      errorDateSortie: undefined,
      errorDateNotification: undefined,
      errorDateEntree: undefined,
      errorAbsencePeriods: undefined,
    }),
    errorState: errors,
  };
};
