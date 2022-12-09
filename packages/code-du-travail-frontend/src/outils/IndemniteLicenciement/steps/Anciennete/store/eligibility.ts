import {
  Absence,
  DISABLE_ABSENCE,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { differenceInMonths } from "date-fns";
import { AncienneteStoreInput } from "./types";
import { Agreement } from "../../../../../conventions/Search/api/type";
import { parse } from "../../../../common/utils";

const getTotalAbsence = (
  absencePeriods: Absence[],
  agreement?: Agreement
): number => {
  return agreement &&
    DISABLE_ABSENCE.includes(
      `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement
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
};

const hasMinimalSeniority = (
  dNotification: Date,
  dEntree: Date,
  totalAbsence: number
) => differenceInMonths(dNotification, dEntree) - totalAbsence >= 8;

export const getErrorEligibility = (
  state: AncienneteStoreInput,
  agreement?: Agreement
) => {
  const dEntree = parse(state.dateEntree);
  const dNotification = parse(state.dateNotification);
  const totalAbsence = getTotalAbsence(state.absencePeriods, agreement);
  const isEligible =
    !state.dateEntree ||
    !state.dateNotification ||
    hasMinimalSeniority(dNotification, dEntree, totalAbsence);
  return !isEligible
    ? `L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.`
    : "";
};
