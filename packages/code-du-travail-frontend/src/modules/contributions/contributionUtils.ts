import { EnterpriseAgreement } from "../enterprise";
import { Contribution } from "./type";

export const isCCSupported = (
  contribution: Contribution,
  agreement: EnterpriseAgreement
) => {
  const { ccSupported = [] } = contribution;
  return ccSupported.includes(agreement.id);
};
export const isCCUnextended = (
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
  const isSupported = isCCSupported(contribution, agreement);
  const isUnextended = isCCUnextended(contribution, agreement);
  return !isUnextended && isSupported;
};
