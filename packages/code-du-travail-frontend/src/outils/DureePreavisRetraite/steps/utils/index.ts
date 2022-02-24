import { supportedCcn } from "@socialgouv/modeles-social";

import { AgreementSupportInfo } from "../../../common/Agreement/types";

export function formatSeniority(initialSeniority: string): string {
  const integerSeniority = parseInt(initialSeniority);
  return isNaN(integerSeniority) ? "0" : integerSeniority.toString();
}

export const getSupportedCC = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: item.preavisRetraite,
    idcc: item.idcc,
  }));
