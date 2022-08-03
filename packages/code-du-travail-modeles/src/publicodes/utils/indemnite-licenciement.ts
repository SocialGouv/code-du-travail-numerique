import { SupportedCcIndemniteLicenciement } from "../../plugins";
import { enumToArray } from "../../utils";

export const getSupportedCcIndemniteLicenciement = () => {
  return enumToArray<string>(SupportedCcIndemniteLicenciement);
};
