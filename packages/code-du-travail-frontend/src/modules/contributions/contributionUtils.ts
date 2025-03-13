import { Contribution } from "./type";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

export const isAgreementSupported = (
  contribution: Contribution,
  agreement: Agreement
) => {
  const { ccSupported = [] } = contribution;
  return ccSupported.includes(agreement.id);
};
export const isAgreementUnextended = (
  contribution: Contribution,
  agreement: Agreement
) => {
  const { ccUnextended = [] } = contribution;
  return ccUnextended.includes(agreement?.id);
};
export const isAgreementValid = (
  contribution: Contribution,
  agreement?: Agreement
) => {
  if (!agreement) return false;
  const isSupported = isAgreementSupported(contribution, agreement);
  const isUnextended = isAgreementUnextended(contribution, agreement);
  return !isUnextended && isSupported;
};
