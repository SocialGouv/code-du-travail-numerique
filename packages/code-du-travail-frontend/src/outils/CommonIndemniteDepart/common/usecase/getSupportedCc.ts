import {
  supportedCcn,
  INDEMNITE_LICENCIEMENT_PRODUCTION_READY_CC,
} from "@socialgouv/modeles-social";
import { IS_PREPROD, IS_PROD } from "../../../../config";
import { AgreementSupportInfo } from "../../../common/Agreement/types";

const getSupportedCcIndemniteLicenciement = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported:
      (IS_PREPROD || IS_PROD) &&
      !INDEMNITE_LICENCIEMENT_PRODUCTION_READY_CC.includes(item.idcc)
        ? false
        : item.indemniteLicenciement,
    idcc: item.idcc,
  }));

export default getSupportedCcIndemniteLicenciement;
