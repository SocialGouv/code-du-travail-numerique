import { SupportedTypes } from "@socialgouv/modeles-social";
import getSupportedCc from "./getSupportedCc";

const isCcFullySupportedIndemniteLicenciement = (idcc: number): boolean => {
  const supportedCc = getSupportedCc();
  const cc = supportedCc.find(
    (item) =>
      item.idcc === idcc &&
      item.fullySupported === SupportedTypes.FULLY_SUPPORTED
  );
  return !!cc;
};

export default isCcFullySupportedIndemniteLicenciement;
