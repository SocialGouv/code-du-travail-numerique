export enum SupportedCcIndemniteLicenciement {
  IDCC1516 = "1516",
  IDCC1518 = "1518",
  IDCC2511 = "2511",
  IDCC2264 = "2264",
  IDCC1979 = "1979",
  IDCC1996 = "1996",
  IDCC3043 = "3043",
  IDCC1090 = "1090",
  IDCC413 = "413",
  IDCC3127 = "3127",
  IDCC1351 = "1351",
  IDCC2941 = "2941",
  IDCC1486 = "1486",
  IDCC1527 = "1527",
  IDCC3239 = "3239",
  IDCC650 = "650",
  IDCC2216 = "2216",
  IDCC0016 = "16",
  IDCC0573 = "573",
  IDCC1596 = "1596",
  IDCC1702 = "1702",
  IDCC0029 = "29",
  IDCC0044 = "44",
  IDCC1517 = "1517",
  IDCC2098 = "2098",
  IDCC2609 = "2609",
  IDCC0675 = "675",
  default = "default",
}

export const getSupportedAgreement = (
  idcc: number
): SupportedCcIndemniteLicenciement | null => {
  for (const value of Object.values(SupportedCcIndemniteLicenciement)) {
    if (value === idcc.toString()) {
      return value as SupportedCcIndemniteLicenciement;
    }
  }
  return null;
};
