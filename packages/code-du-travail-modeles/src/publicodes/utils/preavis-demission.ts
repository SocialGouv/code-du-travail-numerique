import type { Unit } from "publicodes";
import type { PublicodesPreavisDemissionResult } from "../types";

export const convertDaysIntoBetterUnit = (
  nodeValue: number,
  unit?: Unit
): PublicodesPreavisDemissionResult => {
  return {
    value: nodeValue,
    unit: unit,
  };
};
