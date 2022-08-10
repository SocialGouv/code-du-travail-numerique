import { SupportedCcIndemniteLicenciement } from "../types";
import { Formula1516 } from "./1516_organismes_formation";
import { Formula1979 } from "./1979_hotels_cafes_restaurants";
import { Formula2264 } from "./2264_hospitalisation_privee";
import { Formula3043 } from "./3043_entreprises_proprete";
import { FormulaLegal } from "./legal";
import type { IFormula } from "./types";

export class FormuleFactory {
  create<T extends SupportedCcIndemniteLicenciement>(idcc: T): IFormula<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1516:
        return new Formula1516() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC2264:
        return new Formula2264() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1979:
        return new Formula1979() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC3043:
        return new Formula3043() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new FormulaLegal() as IFormula<T>;
    }
  }
}

export * from "./types";
