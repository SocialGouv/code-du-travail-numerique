import {
  Absence,
  DISABLE_ABSENCE,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { differenceInMonths } from "date-fns";
import { AncienneteStoreInput } from "./types";
import { Agreement } from "../../../../../conventions/Search/api/type";
import { parse } from "../../../../common/utils";
import { CommonInformationsStoreInput } from "../../../../CommonSteps/Informations/store";

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

export const getErrorEligibility = (
  state: AncienneteStoreInput,
  stateInfo: CommonInformationsStoreInput,
  isInaptitude: boolean,
  agreement?: Agreement
) => {
  if (isInaptitude || !state.dateEntree || !state.dateNotification) {
    return;
  }
  const dEntree = parse(state.dateEntree);
  const dNotification = parse(state.dateNotification);
  const totalAbsence = getTotalAbsence(state.absencePeriods, agreement);
  let minimalSeniority = 8;
  let minimalSeniorityError =
    "L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.";
  let diff = differenceInMonths(dNotification, dEntree);
  if (
    agreement?.num === 3239 &&
    stateInfo.publicodesInformations[0].info === "'Assistant maternel'"
  ) {
    minimalSeniority = 9;
    minimalSeniorityError =
      "L’indemnité de licenciement n’est pas due lorsque l’ancienneté de l'assistant maternel est inférieure à 9 mois.";
  } else if (agreement?.num === 1517) {
    const dSortie = parse(state.dateSortie);
    diff = differenceInMonths(dSortie, dEntree);
  }
  const isEligible = diff < 0 || diff - totalAbsence >= 8;
  return !isEligible ? minimalSeniorityError : undefined;
};
