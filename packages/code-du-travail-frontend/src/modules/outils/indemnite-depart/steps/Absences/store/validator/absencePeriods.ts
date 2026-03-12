import { differenceInMonths, isAfter, isWithinInterval } from "date-fns";
import { parse } from "../../../../../common/utils";
import {
  AbsenceDetailStoreError,
  AbsenceStoreError,
  AbsenceStoreInput,
} from "../types";
import { CommonInformationsStoreInput } from "../../../Informations/store";
import { informationToSituation } from "../../../Informations/components/utils";
import { AncienneteStoreInput } from "../../../Anciennete";

export const getAbsencePeriodsErrors = (
  state: AbsenceStoreInput,
  ancienneteState: AncienneteStoreInput,
  information?: CommonInformationsStoreInput
): Partial<AbsenceStoreError> => {
  const dEntree = parse(ancienneteState.dateEntree);
  const dSortie = parse(ancienneteState.dateSortie);
  const totalMonth = differenceInMonths(dSortie, dEntree);
  const errors: AbsenceStoreError = {};

  if (!information) return errors;

  const informationData = informationToSituation(
    information.publicodesInformations
  );

  if (state.hasAbsenceProlonge === "oui") {
    let totalMonthAbsence = 0;
    const absenceErrors: AbsenceDetailStoreError[] = state.absencePeriods.map(
      (item): AbsenceDetailStoreError => {
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
            errorDate: `La date de l'absence doit être comprise entre le ${ancienneteState.dateEntree} et le ${ancienneteState.dateSortie} (dates de début et de fin de contrat)`,
          };
        }
        return {};
      }
    );
    if (absenceErrors.length === 0) {
      errors.errorAbsencePeriods = {
        absences: [
          {
            errorDuration: "Veuillez renseigner à minima une absence",
          },
        ],
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
        absences: state.absencePeriods.map(() => ({
          errorDuration: `La durée totale des absences (${totalMonthAbsence} mois) ne peut pas être supérieure à la durée totale du contrat (${totalMonth} mois)`,
        })),
      };
    } else {
      errors.errorAbsencePeriods = undefined;
    }
  } else {
    errors.errorAbsencePeriods = undefined;
  }

  return errors;
};
