import type { Evaluation } from "publicodes";

import {
  getSupportedAgreement,
  getSupportedAgreementHorsAni,
} from "../../modeles";
import type { ExplanationAgreementResult } from "../types";
import { ExplanationBuilder } from "../common/ExplanationBuilder";

export class ExplanationBuilderRuptureCo extends ExplanationBuilder {
  getAgreementExplanation = (
    agreementResult?: Evaluation<number>
  ): ExplanationAgreementResult => {
    if (!this.idcc) {
      return "NO_AGREEMENT_SELECTED";
    }

    const isHorsAni = getSupportedAgreementHorsAni(parseInt(this.idcc));

    if (isHorsAni) {
      return "IS_HORS_ANI";
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
