import { Agreement } from "../../../../../conventions/Search/api/type";

type InfoWarningProps = {
  hasSelectedAgreement: boolean;
  isAgreementSupported: boolean;
  informationEligibility: boolean;
  contratTravailEligibility: boolean;
  ancienneteEligibility: boolean;
  isCdd: boolean;
  agreement?: Agreement;
};

export const getInfoWarning = ({
  hasSelectedAgreement,
  isAgreementSupported,
  isCdd,
  informationEligibility,
  contratTravailEligibility,
  ancienneteEligibility,
  agreement,
}: InfoWarningProps) => {
  const isEligible =
    contratTravailEligibility &&
    ancienneteEligibility &&
    informationEligibility;
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
    if (
      isCdd ||
      (contratTravailEligibility &&
        !informationEligibility &&
        agreement?.num === 3239)
    ) {
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
