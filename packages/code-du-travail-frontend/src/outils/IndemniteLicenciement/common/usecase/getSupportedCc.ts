import { supportedCcn } from "@socialgouv/modeles-social";
import { AgreementSupportInfo } from "../../../common/Agreement/types";
import { isProdOrPreprod } from "../../../../config";

const productionNotReady: number[] = [
  1516, 1517, 1702, 2098, 2511, 2609, 787, 843,
];

const getSupportedCcIndemniteLicenciement = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported:
      isProdOrPreprod && productionNotReady.includes(item.idcc)
        ? false
        : item.indemniteLicenciement,
    idcc: item.idcc,
  }));

export default getSupportedCcIndemniteLicenciement;
