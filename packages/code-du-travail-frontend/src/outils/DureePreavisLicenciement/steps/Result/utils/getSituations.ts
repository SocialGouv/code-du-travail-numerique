import {
  filterSituations,
  getSituationsFor,
} from "../../../../common/situations.utils";
import { Criteria, Situation } from "@cdt/data";
import { Situations } from "./types";

export const getSituations = (
  allSituations: Situation[],
  legalCriteria: Criteria,
  agreementCriteria: Criteria,
  idcc: number
): Situations => {
  // Agreement situation
  const initialAgreementSituations =
    idcc > 0 ? getSituationsFor(allSituations, { idcc }) : [];
  const possibleAgreementSituations = filterSituations(
    initialAgreementSituations,
    agreementCriteria
  );

  const agreementSituation =
    possibleAgreementSituations.length > 0
      ? possibleAgreementSituations[0]
      : undefined;

  if (agreementSituation?.disableLegal) {
    return {
      agreement: {
        criteria: agreementSituation.criteria,
        duration: parseInt(agreementSituation.answer3 ?? "0", 10),
        answer: agreementSituation.answer ?? "",
        ref: agreementSituation.ref ?? undefined,
        refUrl: agreementSituation.refUrl ?? undefined,
      },
    };
  }

  // Legal situation
  const initialLegalSituations = getSituationsFor(allSituations, {
    idcc: 0,
  });
  const possibleLegalSituations = filterSituations(
    initialLegalSituations,
    legalCriteria
  );

  const legalSituation =
    possibleLegalSituations.length > 0 ? possibleLegalSituations[0] : undefined;

  return {
    legal: legalSituation && {
      criteria: legalSituation.criteria,
      duration: parseInt(legalSituation.answer3 ?? "0", 10),
      answer: legalSituation.answer ?? "",
    },
    agreement: agreementSituation && {
      criteria: agreementSituation.criteria,
      duration: parseInt(agreementSituation.answer3 ?? "0", 10),
      answer: agreementSituation.answer ?? "",
      ref: agreementSituation.ref ?? undefined,
      refUrl: agreementSituation.refUrl ?? undefined,
    },
  };
};
