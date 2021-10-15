import { supportedCcn } from "@socialgouv/modeles-social";

import { AgreementStatus } from "../steps/component/DecryptedResult";

export const getAgreementStatus = (ccn: any): AgreementStatus => {
  const agreementFound = supportedCcn.find((item) => item.idcc === ccn.num);
  return agreementFound
    ? agreementFound.preavisRetraite
      ? AgreementStatus.Supported
      : AgreementStatus.Planned
    : AgreementStatus.NotSupported;
};
