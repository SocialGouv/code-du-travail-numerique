import { DismissalReason573 } from "../../conventions";
import { SupportedCcIndemniteLicenciement } from "..";
import { DismissalReasonDefault } from "../dismissal-reason";
import type { IDismissalReason } from "../types/dismissalReason";

export class DismissalReasonFactory {
  create(idcc: string): IDismissalReason {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC0573:
        return new DismissalReason573();
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new DismissalReasonDefault();
    }
  }
}
