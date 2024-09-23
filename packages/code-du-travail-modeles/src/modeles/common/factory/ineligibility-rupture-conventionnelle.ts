import { IneligibilityRuptureConventionnelle } from "../../base";
import { IneligibilityRuptureConventionnelle3239 } from "../../conventions";
import { SupportedCc } from "..";
import type { IInegibility } from "../types/ineligibility";

export class IneligibilityRuptureConventionnelleFactory {
  create<T extends SupportedCc>(idcc: T): IInegibility {
    switch (idcc) {
      case SupportedCc.IDCC3239:
        return new IneligibilityRuptureConventionnelle3239();
      default:
        return new IneligibilityRuptureConventionnelle();
    }
  }
}
