import { PublicodesSimulator, supportedCcn } from "@socialgouv/modeles-social";
import { AgreementSupportInfo } from "../../indemnite-depart/common/types";

const getSupportedCc = (
  simulator: PublicodesSimulator
): AgreementSupportInfo[] => {
  let key = "";
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
    default:
      throw new Error("Unsupported simulator type");
  }
  return supportedCcn.map((item) => ({
    fullySupported: item[key],
    idcc: item.idcc,
  }));
};

export default getSupportedCc;
