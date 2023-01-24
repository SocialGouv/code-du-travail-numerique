import { isWithinInterval } from "date-fns";
import { parse } from "../../../../../common/utils";
import {
  AncienneteAbsenceStoreError,
  AncienneteStoreError,
  AncienneteStoreInput,
} from "../types";
import { CommonInformationsStoreInput } from "../../../../../CommonSteps/Informations/store";
import { informationToSituation } from "../../../../../CommonSteps/Informations/utils";

export const getAbsencePeriodsErrors = (
  state: AncienneteStoreInput,
  information?: CommonInformationsStoreInput
): Partial<AncienneteStoreError> => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  let errors: AncienneteStoreError = {};

  if (!information) return errors;

  const informationData = informationToSituation(
    information.publicodesInformations
  );

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
            errorDate: `La date de l'absence doit être comprise entre le ${state.dateEntree} et le ${state.dateSortie} (dates de début et de fin de contrat)`,
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

  return errors;
};
