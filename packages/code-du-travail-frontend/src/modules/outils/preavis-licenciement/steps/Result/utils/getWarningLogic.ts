import { ExplanationMainResult } from "@socialgouv/modeles-social";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  ccn?: Agreement;
  resultExplanation?: ExplanationMainResult;
};

export const getWarningMessage = (params: Props): string => {
  const { ccn, resultExplanation } = params;

  if (ccn && ccn.num === 3239) {
    return "Le contrat de travail ou un usage peut prévoir une durée de préavis ou une condition d'ancienneté plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié.";
  }

  if (resultExplanation) {
    switch (resultExplanation) {
      case "SAME_AMOUNT":
        return "Une durée de préavis de licenciement ou une condition d'ancienneté plus favorable au salarié peut être prévue par un accord d'entreprise, le contrat de travail ou les usages.";

      case "AGREEMENT_AMOUNT_MORE":
        return "Une durée de préavis de licenciement ou une condition d'ancienneté plus favorable au salarié que ce que prévoit le code du travail peut être prévue par la loi pour certains cas particuliers, par un accord d'entreprise, le contrat de travail ou les usages.";

      case "LEGAL_AMOUNT_MORE":
        return "L'existence ou la durée du préavis de licenciement peut aussi être prévue dans un accord d'entreprise ou à défaut par un usage dans l'entreprise.";

      case "HAS_NOT_SELECTED_AGREEMENT":
        return "L'existence et la durée du préavis de licenciement peuvent être prévues dans la convention collective, un accord d'entreprise ou à défaut par un usage dans l'entreprise.";

      case "AGREEMENT_NOT_SUPPORTED":
        return "Une durée de préavis de licenciement ou une condition d'ancienneté plus favorable au salarié peut être prévue par une convention collective, un accord de branche, un accord d'entreprise ou le contrat de travail ou les usages.";

      case "AGREEMENT_RESULT_ZERO":
        return "L'existence ou la durée du préavis de licenciement peut être prévue, par la loi pour certains cas particuliers, par un accord d'entreprise ou à défaut par un usage dans l'entreprise.";

      case "LEGAL_RESULT_ZERO_BUT_AGREEMENT":
        return "L'existence ou la durée du préavis de licenciement peut aussi être prévue dans un accord d'entreprise ou à défaut par un usage dans l'entreprise.";

      case "NO_EXPLANATION":
      default:
        return "Une durée de préavis de licenciement ou une condition d'ancienneté plus favorable au salarié peut être prévue par un accord d'entreprise, le contrat de travail ou les usages.";
    }
  }
  return "Une durée de préavis de licenciement ou une condition d'ancienneté plus favorable au salarié peut être prévue par un accord d'entreprise, le contrat de travail ou les usages.";
};
