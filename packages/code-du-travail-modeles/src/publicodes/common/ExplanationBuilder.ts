import type { Evaluation } from "publicodes";

import { getSupportedAgreement } from "../../modeles";
import type {
  ExplanationAgreementResult,
  ExplanationMainResult,
} from "../types";

export class ExplanationBuilder {
  protected readonly idcc?: string;

  constructor(idcc?: string) {
    this.idcc = idcc;
  }

  getMainExplanation(
    legalResult?: Evaluation<number>,
    agreementResult?: Evaluation<number>
  ): ExplanationMainResult {
    const parseAgreementResult = parseFloat(agreementResult?.toString() ?? "");
    const legalAgreementResult = parseFloat(legalResult?.toString() ?? "");

    if (!this.idcc) {
      return "HAS_NOT_SELECTED_AGREEMENT";
    }

    const isAgreementSupported = getSupportedAgreement(parseInt(this.idcc));

    if (!isAgreementSupported) {
      return "AGREEMENT_NOT_SUPPORTED";
    }

    if (parseAgreementResult === 0) {
      return "AGREEMENT_RESULT_ZERO";
    }
    if (legalAgreementResult === 0 && parseAgreementResult > 0) {
      return "LEGAL_RESULT_ZERO_BUT_AGREEMENT";
    }

    if (parseAgreementResult === legalAgreementResult) {
      return "SAME_AMOUNT";
    }

    if (parseAgreementResult > legalAgreementResult) {
      return "AGREEMENT_AMOUNT_MORE";
    }

    if (parseAgreementResult < legalAgreementResult) {
      return "LEGAL_AMOUNT_MORE";
    }

    return "NO_EXPLANATION";
  }

  getAgreementExplanation = (
    agreementResult?: Evaluation<number>
  ): ExplanationAgreementResult => {
    if (!this.idcc) {
      return "NO_AGREEMENT_SELECTED";
    }

    const isAgreementSupported = getSupportedAgreement(parseInt(this.idcc));

    if (!isAgreementSupported) {
      return "AGREEMENT_NOT_SUPPORTED";
    }

    if (agreementResult === 0) {
      return "AGREEMENT_RESULT_ZERO";
    }
    return "NO_EXPLANATION";
  };
}
