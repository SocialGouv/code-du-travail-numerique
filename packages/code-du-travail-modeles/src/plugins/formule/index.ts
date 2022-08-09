import { SupportedCcIndemniteLicenciement } from "../types";
import { Formula1516 } from "./1516_organismes_formation";
import { Formula2264 } from "./2264_hospitalisation_privee";
import { FormulaLegal } from "./legal";
import type { IFormula } from "./types";

export class FormuleFactory {
  create<T extends SupportedCcIndemniteLicenciement>(idcc: T): IFormula<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1516:
        return new Formula1516() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC2264:
        return new Formula2264() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new FormulaLegal() as IFormula<T>;
    }
  }
}

export * from "./types";
