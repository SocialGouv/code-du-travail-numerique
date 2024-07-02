/* eslint @typescript-eslint/naming-convention: 0 */
export enum SupportedCc {
  IDCC0292 = "292",
  IDCC1505 = "1505",
  IDCC1516 = "1516",
  IDCC1606 = "1606",
  IDCC1518 = "1518",
  IDCC2511 = "2511",
  IDCC2264 = "2264",
  IDCC1979 = "1979",
  IDCC1996 = "1996",
  IDCC3043 = "3043",
  IDCC1090 = "1090",
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
  IDCC0044 = "44",
  IDCC1517 = "1517",
  IDCC2098 = "2098",
  IDCC2596 = "2596",
  IDCC2609 = "2609",
  IDCC0675 = "675",
  IDCC1501 = "1501",
  IDCC1597 = "1597",
  IDCC787 = "787",
  IDCC843 = "843",
  IDCC1147 = "1147",
  IDCC2614 = "2614",
  IDCC1266 = "1266",
  IDCC275 = "275",
  IDCC1404 = "1404",
  IDCC1043 = "1043",
  IDCC1672 = "1672",
  IDCC0086 = "86",
  IDCC2148 = "2148",
  IDCC1483 = "1483",
  IDCC1740 = "1740",
  IDCC0176 = "176",
  IDCC2120 = "2120",
  IDCC3248 = "3248",
  default = "default",
}

export const getSupportedAgreement = (idcc: number): SupportedCc | null => {
  for (const value of Object.values(SupportedCc)) {
    if (value === idcc.toString()) {
      return value;
    }
  }
  return null;
};

export enum SupportedAgreementHorsAni {
  IDCC1043 = "1043",
  IDCC1518 = "1518",
  IDCC2511 = "2511",
  IDCC2941 = "2941",
}

export const getSupportedAgreementHorsAni = (
  idcc: number
): SupportedAgreementHorsAni | null => {
  for (const value of Object.values(SupportedAgreementHorsAni)) {
    if (value === idcc.toString()) {
      return value;
    }
  }
  return null;
};
