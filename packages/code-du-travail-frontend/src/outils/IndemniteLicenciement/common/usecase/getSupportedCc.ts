import { supportedCcn } from "@socialgouv/modeles-social";
import { AgreementSupportInfo } from "../../../common/Agreement/types";

const getSupportedCcIndemniteLicenciement = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: item.indemniteLicenciement,
    idcc: item.idcc,
    withoutLegal: item.indemniteLicenciementSansLegal,
  }));

export default getSupportedCcIndemniteLicenciement;
