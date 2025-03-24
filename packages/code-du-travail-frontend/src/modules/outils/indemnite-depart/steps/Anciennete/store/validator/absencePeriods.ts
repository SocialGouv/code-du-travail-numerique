import { isAfter, isWithinInterval, differenceInMonths } from "date-fns";
import { parse } from "../../../../../common/utils";
import {
  AncienneteAbsenceStoreError,
  AncienneteStoreError,
  AncienneteStoreInput,
} from "../types";
import { CommonInformationsStoreInput } from "../../../Informations/store";
import { informationToSituation } from "../../../Informations/components/utils";

export const getAbsencePeriodsErrors = (
  state: AncienneteStoreInput,
  information?: CommonInformationsStoreInput
): Partial<AncienneteStoreError> => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const totalMonth = differenceInMonths(dSortie, dEntree);
  let errors: AncienneteStoreError = {};

  if (!information) return errors;

  const informationData = informationToSituation(
    information.publicodesInformations
  );

  // Check all absences
  if (state.hasAbsenceProlonge === "oui") {
    let totalMonthAbsence = 0;
    const absenceErrors: AncienneteAbsenceStoreError[] =
      state.absencePeriods.map((item): AncienneteAbsenceStoreError => {
        totalMonthAbsence += item.durationInMonth ?? 0;
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
          dEntree &&
          dSortie &&
          isAfter(dSortie, dEntree) &&
          !isWithinInterval(parse(item.startedAt), {
            start: dEntree,
            end: dSortie,
          })
        ) {
          return {
            errorDate: `La date de l'absence doit être comprise entre le ${state.dateEntree} et le ${state.dateSortie} (dates de début et de fin de contrat)`,
          };
        }
        return {};
      });
    if (absenceErrors.length === 0) {
      errors.errorAbsencePeriods = {
        global: "Vous devez renseigner à minima une absence",
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
    } else if (totalMonth < totalMonthAbsence) {
      errors.errorAbsencePeriods = {
        global:
          "La durée totale des absences doit être inférieure ou égale à l'ancienneté",
      };
    } else {
      errors.errorAbsencePeriods = undefined;
    }
  } else {
    errors.errorAbsencePeriods = undefined;
  }

  return errors;
};
