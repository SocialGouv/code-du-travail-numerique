import { AncienneteStoreInput } from "./types";
import { Agreement } from "../../../../../conventions/Search/api/type";
import { parse } from "../../../../common/utils";
import { hasMinimalSeniority, getTotalAbsence } from "./validator";

export const getErrorLegal = (
  state: AncienneteStoreInput,
  agreement?: Agreement
) => {
  const dEntree = parse(state.dateEntree);
  const dNotification = parse(state.dateNotification);
  const totalAbsence = getTotalAbsence(state.absencePeriods, agreement);
  const isElligible =
    !state.dateEntree ||
    !state.dateNotification ||
    hasMinimalSeniority(dNotification, dEntree, totalAbsence);
  return !isElligible
    ? `L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois.`
    : "";
};
