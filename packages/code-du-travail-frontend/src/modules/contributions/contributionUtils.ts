import { EnterpriseAgreement } from "../enterprise";
import { Contribution } from "./type";

export const isAgreementSupported = (
  contribution: Contribution,
  agreement: EnterpriseAgreement
) => {
  const { ccSupported = [] } = contribution;
  return ccSupported.includes(agreement.id);
};
export const isAgreementUnextended = (
  contribution: Contribution,
  agreement: EnterpriseAgreement
) => {
  const { ccUnextended = [] } = contribution;
  return ccUnextended.includes(agreement?.id);
};
export const isAgreementValid = (
  contribution: Contribution,
  agreement?: EnterpriseAgreement
) => {
  if (!agreement) return false;
  const isSupported = isAgreementSupported(contribution, agreement);
  const isUnextended = isAgreementUnextended(contribution, agreement);
  return !isUnextended && isSupported;
};
