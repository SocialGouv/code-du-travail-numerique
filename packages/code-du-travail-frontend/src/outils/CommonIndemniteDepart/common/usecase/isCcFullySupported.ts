import getSupportedCcIndemniteLicenciement from "./getSupportedCc";

const isCcFullySupportedIndemniteLicenciement = (idcc: number): boolean => {
  const supportedCc = getSupportedCcIndemniteLicenciement();
  const cc = supportedCc.find(
    (item) => item.idcc === idcc && item.fullySupported
  );
  return !!cc;
};

export default isCcFullySupportedIndemniteLicenciement;
