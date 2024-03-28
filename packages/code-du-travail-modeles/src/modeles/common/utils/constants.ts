import ccnSupported from "./ccn-supported.json";

export type AgreementInfo = {
  idcc: number;
  preavisRetraite: boolean;
  indemniteLicenciement: boolean | null;
};

export const supportedCcn: AgreementInfo[] = ccnSupported;
