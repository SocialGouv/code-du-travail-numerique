import {
  ExplanationAgreementResult,
  ExplanationMainResult,
} from "@socialgouv/modeles-social";

export const getDecryptedValueAgreement = (
  value?: ExplanationAgreementResult,
  agreementResult?: string
): string => {
  const defaultResult = `${agreementResult} €`;
  if (!value) return defaultResult;
  switch (value) {
    case "IS_HORS_ANI":
      return "Non applicable dans votre situation";
    case "NO_AGREEMENT_SELECTED":
      return "Convention collective non renseignée";
    case "AGREEMENT_NOT_SUPPORTED":
      return "Convention collective non traitée";
    case "AGREEMENT_RESULT_ZERO":
      return "La convention collective ne prévoit pas d'indemnité dans ce cas";
    case "NO_EXPLANATION":
    default:
      return defaultResult;
  }
};

export const getDecryptedValue = (
  label: string,
  value: ExplanationMainResult
): string => {
  switch (value) {
    case "HAS_NOT_SELECTED_AGREEMENT":
      return `La convention collective n'ayant pas été renseignée, le montant de l'indemnité de ${label} affiché correspond au montant prévu par le code du travail.`;
    case "AGREEMENT_NOT_SUPPORTED":
      return `La convention collective n'ayant pas été traitée par nos services, le montant de l'indemnité de ${label} affiché correspond au montant prévu par le code du travail.`;
    case "AGREEMENT_RESULT_ZERO":
      return `En l'absence de montant prévu par la convention collective, le montant de l'indemnité de ${label} à appliquer pour le salarié est donc le montant prévu par le code du travail.`;
    case "LEGAL_RESULT_ZERO_BUT_AGREEMENT":
      return `En l'absence de montant prévu par le code du travail, le montant de l'indemnité de ${label} à appliquer pour le salarié est donc le montant prévu par la convention collective.`;
    case "SAME_AMOUNT":
      return "Le montant prévu par le code du travail est le même que celui prévu par la convention collective.";
    case "AGREEMENT_AMOUNT_MORE":
      return "Le montant à retenir pour le salarié est celui prévu par la convention collective, celui-ci étant plus favorable que le montant prévu par le code du travail.";
    case "LEGAL_AMOUNT_MORE":
      return "Le montant à retenir pour le salarié est celui prévu par le code du travail, celui-ci étant plus favorable que le montant prévu par la convention collective.";
    case "NO_EXPLANATION":
    default:
      throw new Error("No explanation provided");
  }
};
