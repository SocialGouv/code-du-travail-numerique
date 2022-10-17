import {
  differenceInMonths,
  format,
  isAfter,
  isWithinInterval,
} from "date-fns";
import { deepEqualObject, isValidDate } from "../../../../../lib";
import { parse } from "../../../../common/utils";
import {
  AncienneteAbsenceStoreError,
  AncienneteStoreError,
  AncienneteStoreInput,
} from "./types";
import frLocale from "date-fns/locale/fr";
import { Agreement } from "../../../../../conventions/Search/api/type";
import {
  DISABLE_ABSENCE,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { CommonInformationsStoreInput } from "../../../../CommonSteps/Informations/store";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";

export const validateStep = (
  state: AncienneteStoreInput,
  information: CommonInformationsStoreInput,
  agreeement?: Agreement
) => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const dNotification = parse(state.dateNotification);
  const absencePeriods = state.absencePeriods;
  let errors: AncienneteStoreError = {};
  const informationData = informationToSituation(
    information.publicodesInformations
  );

  const totalAbsence: number =
    agreeement &&
    DISABLE_ABSENCE.includes(
      `IDCC${agreeement.num}` as SupportedCcIndemniteLicenciement
    )
      ? 0
      : absencePeriods
          .filter((period) => Boolean(period.durationInMonth))
          .reduce((total, item) => {
            if (!item.durationInMonth) {
              return total;
            }
            return total + item.durationInMonth * item.motif.value;
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

  // Check all absences
  if (state.hasAbsenceProlonge === "oui") {
    const absenceErrors: AncienneteAbsenceStoreError[] =
      state.absencePeriods.map((item): AncienneteAbsenceStoreError => {
        if (
          !item.durationInMonth ||
          (item.motif.startAt &&
            item.motif.startAt(informationData) &&
            !item.startedAt)
        ) {
          return {
            errorDuration: !item.durationInMonth
              ? "Veuillez saisir la durée de l'absence"
              : undefined,
            errorDate:
              item.motif.startAt &&
              item.motif.startAt(informationData) &&
              !item.startedAt
                ? "Veuillez saisir la date de l'absence"
                : undefined,
          };
        }
        if (
          item.motif.startAt &&
          item.motif.startAt(informationData) &&
          item.startedAt &&
          state.dateEntree &&
          state.dateSortie &&
          !isWithinInterval(parse(item.startedAt), {
            start: dEntree,
            end: dSortie,
          })
        ) {
          return {
            errorDate: `La date de l'absence doit être comprise entre le ${state.dateEntree} et le ${state.dateSortie} (dates d'entrée et de sortie de l'entreprise)`,
          };
        }
        return {};
      });
    if (absenceErrors.length === 0) {
      errors.errorAbsencePeriods = {
        global: "Vous devez renseigner tous les champs",
      };
    } else if (
      absenceErrors.filter(
        (item) =>
          item.errorDuration !== undefined || item.errorDate !== undefined
      ).length > 0
    ) {
      errors.errorAbsencePeriods = {
        absences: absenceErrors,
      };
    } else {
      errors.errorAbsencePeriods = undefined;
    }
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
