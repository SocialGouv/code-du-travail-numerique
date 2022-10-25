import ccnSupported from "./ccn-supported.json";

export type AgreementInfo = {
  idcc: number;
  preavisRetraite: boolean;
  indemniteLicenciement: boolean;
  indemniteLicenciementSansLegal: boolean;
};

export const supportedCcn: AgreementInfo[] = ccnSupported;
