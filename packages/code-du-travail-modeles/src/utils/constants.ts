import ccnSupported from "./ccn-supported.json";

export type AgreementInfo = {
  idcc: number;
  preavisRetraite: boolean;
};

export const supportedCcn: AgreementInfo[] = ccnSupported;
