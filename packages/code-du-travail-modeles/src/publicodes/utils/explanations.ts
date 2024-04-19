import {
  getSupportedAgreement,
  getSupportedAgreementHorsAni,
} from "../../modeles";

export type ExplanationMainResult =
  | "AGREEMENT_AMOUNT_MORE"
  | "AGREEMENT_NOT_SUPPORTED"
  | "AGREEMENT_RESULT_ZERO"
  | "HAS_NOT_SELECTED_AGREEMENT"
  | "LEGAL_AMOUNT_MORE"
  | "LEGAL_RESULT_ZERO_BUT_AGREEMENT"
  | "NO_EXPLANATION"
  | "SAME_AMOUNT";

export const getMainExplanation = (
  idcc?: string,
  legalResult?: string,
  agreementResult?: string
): ExplanationMainResult => {
  const parseAgreementResult = parseFloat(agreementResult ?? "");
  const legalAgreementResult = parseFloat(legalResult ?? "");

  if (!idcc) {
    return "HAS_NOT_SELECTED_AGREEMENT";
  }

  const isAgreementSupported = getSupportedAgreement(parseInt(idcc));

  if (!isAgreementSupported) {
    return "AGREEMENT_NOT_SUPPORTED";
  }

  if (!isNaN(parseAgreementResult)) {
    if (parseAgreementResult === 0) {
      return "AGREEMENT_RESULT_ZERO";
    }
    if (legalAgreementResult === 0 && parseAgreementResult > 0) {
      return "LEGAL_RESULT_ZERO_BUT_AGREEMENT";
    }
    if (parseAgreementResult !== 0 && legalAgreementResult !== 0) {
      if (parseAgreementResult === legalAgreementResult) {
        return "SAME_AMOUNT";
      }
      if (parseAgreementResult > legalAgreementResult) {
        return "AGREEMENT_AMOUNT_MORE";
      }
      if (parseAgreementResult < legalAgreementResult) {
        return "LEGAL_AMOUNT_MORE";
      }
    }
  }
  return "NO_EXPLANATION";
};

export type ExplanationAgreementResult =
  | "AGREEMENT_NOT_SUPPORTED"
  | "AGREEMENT_RESULT_ZERO"
  | "IS_HORS_ANI"
  | "NO_AGREEMENT_SELECTED"
  | "NO_EXPLANATION";

export const getExplanationAgreement = (
  isRuptureConventionnelle: boolean,
  idcc?: string,
  agreementResult?: string
): ExplanationAgreementResult => {
  if (!idcc) {
    return "NO_AGREEMENT_SELECTED";
  }

  const isHorsAni = getSupportedAgreementHorsAni(parseInt(idcc));

  if (isHorsAni && isRuptureConventionnelle) {
    return "IS_HORS_ANI";
  }

  const isAgreementSupported = getSupportedAgreement(parseInt(idcc));

  if (!isAgreementSupported) {
    return "AGREEMENT_NOT_SUPPORTED";
  }

  if (agreementResult === "0") {
    return "AGREEMENT_RESULT_ZERO";
  }
  return "NO_EXPLANATION";
};
