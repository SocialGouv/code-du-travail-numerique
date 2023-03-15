export enum SupportedCcIndemniteLicenciement {
  IDCC0016 = "16",
  IDCC0029 = "29",
  IDCC0044 = "44",
  IDCC413 = "413",
  IDCC0573 = "573",
  IDCC650 = "650",
  IDCC787 = "787",
  IDCC843 = "843",
  IDCC1090 = "1090",
  IDCC1351 = "1351",
  IDCC1486 = "1486",
  IDCC1501 = "1501",
  IDCC1516 = "1516",
  IDCC1517 = "1517",
  IDCC1518 = "1518",
  IDCC1527 = "1527",
  IDCC1596 = "1596",
  IDCC1597 = "1597",
  IDCC1702 = "1702",
  IDCC1979 = "1979",
  IDCC1996 = "1996",
  IDCC2098 = "2098",
  IDCC2216 = "2216",
  IDCC2264 = "2264",
  IDCC2511 = "2511",
  IDCC2596 = "2596",
  IDCC2609 = "2609",
  IDCC2941 = "2941",
  IDCC3043 = "3043",
  IDCC3127 = "3127",
  IDCC3239 = "3239",

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
