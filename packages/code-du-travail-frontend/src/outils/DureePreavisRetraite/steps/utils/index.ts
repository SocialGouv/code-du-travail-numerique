import { supportedCcn } from "@socialgouv/modeles-social";

import { AgreementSupportInfo } from "../../../common/Agreement/types";

export const getSupportedCC = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: item.preavisRetraite,
    idcc: item.idcc,
  }));
