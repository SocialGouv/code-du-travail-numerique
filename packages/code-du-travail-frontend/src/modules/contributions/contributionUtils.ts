import { ElasticSearchContributionGeneric } from "@socialgouv/cdtn-types";
import { EnterpriseAgreement } from "../enterprise";

export const isCCSupported = (
  contribution: ElasticSearchContributionGeneric,
  agreement: EnterpriseAgreement
) => {
  const { ccSupported } = contribution;
  return ccSupported.includes(agreement.id);
};
export const isCCUnextended = (
  contribution: ElasticSearchContributionGeneric,
  agreement: EnterpriseAgreement
) => {
  const { ccUnextended } = contribution;
  return ccUnextended.includes(agreement?.id);
};
export const isAgreementValid = (
  contribution: ElasticSearchContributionGeneric,
  agreement?: EnterpriseAgreement
) => {
  if (!agreement) return false;
  const isSupported = isCCSupported(contribution, agreement);
  const isUnextended = isCCUnextended(contribution, agreement);
  return !isUnextended && isSupported;
};
