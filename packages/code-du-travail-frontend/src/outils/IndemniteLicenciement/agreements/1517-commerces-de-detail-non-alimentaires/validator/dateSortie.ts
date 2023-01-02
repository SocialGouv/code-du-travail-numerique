import { differenceInMonths, isAfter } from "date-fns";
import {
  DISABLE_ABSENCE,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { Agreement } from "../../../../../conventions/Search/api/type";
import { isValidDate } from "../../../../../lib";
import {
  AncienneteStoreInput,
  AncienneteStoreError,
} from "../../../steps/Anciennete/store";
import { parse } from "../../../../common/utils";

export const getDateSortieErrors = (
  state: AncienneteStoreInput,
  agreeement: Agreement
): Partial<AncienneteStoreError> => {
  const dEntree = parse(state.dateEntree);
  const dSortie = parse(state.dateSortie);
  const absencePeriods = state.absencePeriods;

  let errors: AncienneteStoreError = {};

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
          }, 0);

  // Date de sortie
  if (!state.dateSortie) {
    errors.errorDateSortie = "Veuillez saisir cette date";
  } else if (state.dateSortie && differenceInMonths(new Date(), dSortie) > 18) {
    errors.errorDateSortie =
      "La date de sortie doit se situer dans les 18 derniers mois";
  } else if (
    state.dateSortie &&
    state.dateEntree &&
    isAfter(dEntree, dSortie)
  ) {
    errors.errorDateSortie =
      "La date de sortie doit se situer après la date d’entrée";
  } else if (
    state.dateEntree &&
    state.dateSortie &&
    differenceInMonths(dSortie, dEntree) - totalAbsence < 8
  ) {
    errors.errorDateSortie =
      "L’indemnité de licenciement est dûe au-delà de 8 mois d’ancienneté";
  } else if (!isValidDate(state.dateSortie)) {
    errors.errorDateSortie = "La date de sortie est invalide";
  } else {
    errors.errorDateSortie = undefined;
  }

  return errors;
};
