import {
  PublicodesSimulator,
  SupportedTypes,
} from "@socialgouv/modeles-social";
import getSupportedCc from "./getSupportedCc";

const isCcFullySupported = (
  idcc: number,
  simulator: PublicodesSimulator
): boolean => {
  const supportedCc = getSupportedCc(simulator);
  const cc = supportedCc.find(
    (item) =>
      item.idcc === idcc &&
      item.fullySupported === SupportedTypes.FULLY_SUPPORTED
  );
  return !!cc;
};

export default isCcFullySupported;
