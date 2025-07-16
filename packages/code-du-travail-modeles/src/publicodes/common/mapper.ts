import { PublicodesIneligibility } from "../types";

export const mapIneligibility = (text: string): PublicodesIneligibility => {
  return {
    ineligibility: text,
    type: "ineligibility",
  };
};
