import { Agreement } from "../../../../../conventions/Search/api/type";

type InfoWarningProps = {
  isEligible: boolean;
  hasSelectedAgreement: boolean;
  isAgreementSupported: boolean;
  isCdd: boolean;
  agreement?: Agreement;
};

export const getInfoWarning = ({
  isEligible,
  hasSelectedAgreement,
  isAgreementSupported,
  isCdd,
  agreement,
}: InfoWarningProps) => {
  let message;
  let title;
  if (isEligible) {
    title = "Attention il peut exister un montant plus favorable";
    if (hasSelectedAgreement && isAgreementSupported) {
      message =
        "Un accord d’entreprise, le contrat de travail ou un usage peut prévoir un montant plus favorable pour le salarié. Dans ce cas, c’est ce montant plus favorable qui s’applique au salarié.";
    } else if (!hasSelectedAgreement || !isAgreementSupported) {
      message =
        "Une convention collective, un accord d’entreprise, le contrat de travail ou un usage peut prévoir un montant plus favorable pour le salarié. Dans ce cas, c’est ce montant plus favorable qui s’applique au salarié.";
    }
  } else {
    title =
      "Attention il peut quand même exister une indemnité pour le salarié";
    if (isCdd || agreement?.num === 3239) {
      return;
    } else if (hasSelectedAgreement && isAgreementSupported) {
      message =
        "Un accord d’entreprise, le contrat de travail ou un usage peut prévoir une indemnité pour le salarié.";
    } else if (!hasSelectedAgreement || !isAgreementSupported) {
      message =
        "Une convention collective, un accord d’entreprise, le contrat de travail ou un usage peut prévoir une indemnité pour le salarié.";
    }
  }
  return message ? { message, title } : undefined;
};
