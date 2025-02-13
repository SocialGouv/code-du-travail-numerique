import { supportedCcn } from "@socialgouv/modeles-social";
import { AgreementSupportInfo } from "../types";

const getSupportedCc = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: item.indemniteLicenciement,
    idcc: item.idcc,
  }));

export default getSupportedCc;
