import { SupportedCcIndemniteLicenciement } from "..";
import { DismissalReasonDefault } from "../dismissalType";
import type { IDismissalReason } from "../types/dismissalReason";

export class DismissalReasonFactory {
  create(idcc: string): IDismissalReason {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new DismissalReasonDefault();
    }
  }
}
