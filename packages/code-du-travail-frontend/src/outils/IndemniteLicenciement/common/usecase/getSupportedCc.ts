import { supportedCcn } from "@socialgouv/modeles-social";
import { AgreementSupportInfo } from "../../../common/Agreement/types";

const productionNotReady: number[] = [
  1516, 1517, 1702, 2098, 2511, 2609, 787, 843, 1996,
];

const getSupportedCcIndemniteLicenciement = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: productionNotReady.includes(item.idcc)
      ? false
      : item.indemniteLicenciement,
    idcc: item.idcc,
  }));

export default getSupportedCcIndemniteLicenciement;
