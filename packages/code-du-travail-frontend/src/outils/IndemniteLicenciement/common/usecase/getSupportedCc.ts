import { supportedCcn } from "@socialgouv/modeles-social";
import { AgreementSupportInfo } from "../../../common/Agreement/types";

const getSupportedCcIndemniteLicenciement = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: item.indemniteLicenciement,
    idcc: item.idcc,
  }));

export default getSupportedCcIndemniteLicenciement;
