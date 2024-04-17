import { IneligibilityRuptureConventionnelle } from "../../base";
import {
  IneligibilityLegalIndemniteLicenciement1404,
  IneligibilityLegalIndemniteLicenciement2596,
  IneligibilityRuptureConventionnelle3239,
} from "../../conventions";
import { SupportedCc } from "..";
import type { IInegibility } from "../types/ineligibility";

export class IneligibilityRuptureConventionnelleFactory {
  create<T extends SupportedCc>(idcc: T): IInegibility {
    switch (idcc) {
      case SupportedCc.IDCC3239:
        return new IneligibilityRuptureConventionnelle3239();
      case SupportedCc.IDCC2596:
        return new IneligibilityLegalIndemniteLicenciement2596();
      case SupportedCc.IDCC1404:
        return new IneligibilityLegalIndemniteLicenciement1404();
      default:
        return new IneligibilityRuptureConventionnelle();
    }
  }
}
