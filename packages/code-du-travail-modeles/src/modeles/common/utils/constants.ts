import ccnSupported from "./ccn-supported.json";

export enum SupportedTypes {
  FULLY_SUPPORTED = "fullySupported",
  SOON_SUPPORTED = "soonSupported",
  NEVER_SUPPORTED = "neverSupported",
}

export type AgreementInfo = {
  idcc: number;
  preavisRetraite: SupportedTypes;
  indemniteLicenciement: SupportedTypes;
  preavisDemission: SupportedTypes;
  ruptureConventionnelle: SupportedTypes;
  indemnitePrecarite: SupportedTypes;
  preavisLicenciement: SupportedTypes;
  heuresRechercheEmploi: SupportedTypes;
};

export const supportedCcn: AgreementInfo[] = ccnSupported;
