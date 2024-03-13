import { IneligibilityRuptureConventionnelle } from "../../base";
import {
  Ineligibility1404,
  Ineligibility2596,
  Ineligibility3239,
} from "../../conventions";
import { SupportedCcIndemniteLicenciement } from "..";
import type { IInegibility } from "../types/ineligibility";

export class IneligibilityRuptureConventionnelleFactory {
  create<T extends SupportedCcIndemniteLicenciement>(idcc: T): IInegibility {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC3239:
        return new Ineligibility3239();
      case SupportedCcIndemniteLicenciement.IDCC2596:
        return new Ineligibility2596();
      case SupportedCcIndemniteLicenciement.IDCC1404:
        return new Ineligibility1404();
      default:
        return new IneligibilityRuptureConventionnelle();
    }
  }
}
