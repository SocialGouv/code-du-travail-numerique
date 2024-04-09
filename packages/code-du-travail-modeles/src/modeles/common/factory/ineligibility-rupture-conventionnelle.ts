import { IneligibilityRuptureConventionnelle } from "../../base";
import {
  Ineligibility1404,
  Ineligibility2596,
  Ineligibility3239,
} from "../../conventions";
import { SupportedCc } from "..";
import type { IInegibility } from "../types/ineligibility";

export class IneligibilityRuptureConventionnelleFactory {
  create<T extends SupportedCc>(idcc: T): IInegibility {
    switch (idcc) {
      case SupportedCc.IDCC3239:
        return new Ineligibility3239();
      case SupportedCc.IDCC2596:
        return new Ineligibility2596();
      case SupportedCc.IDCC1404:
        return new Ineligibility1404();
      default:
        return new IneligibilityRuptureConventionnelle();
    }
  }
}
