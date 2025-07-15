import {
  AgreementInfo,
  PublicodesSimulator,
  supportedCcn,
} from "@socialgouv/modeles-social";
import { AgreementSupportInfo } from "../../indemnite-depart/common/types";

const getSupportedCc = (
  simulator: PublicodesSimulator
): AgreementSupportInfo[] => {
  let key: keyof Omit<AgreementInfo, "idcc">;
  switch (simulator) {
    case PublicodesSimulator.PREAVIS_DEMISSION:
      key = "preavisDemission";
      break;
    case PublicodesSimulator.INDEMNITE_LICENCIEMENT:
      key = "indemniteLicenciement";
      break;
    case PublicodesSimulator.RUPTURE_CONVENTIONNELLE:
      key = "ruptureConventionnelle";
      break;
    case PublicodesSimulator.PREAVIS_RETRAITE:
      key = "preavisRetraite";
      break;
    case PublicodesSimulator.INDEMNITE_PRECARITE:
      key = "indemnitePrecarite";
      break;
    case PublicodesSimulator.PREAVIS_LICENCIEMENT:
      key = "preavisLicenciement";
      break;
    default:
      throw new Error(
        `Unsupported simulator: ${simulator}. Supported simulators are: ${Object.values(
          PublicodesSimulator
        ).join(", ")}`
      );
  }
  return supportedCcn.map((item) => ({
    fullySupported: item[key],
    idcc: item.idcc,
  }));
};

export default getSupportedCc;
