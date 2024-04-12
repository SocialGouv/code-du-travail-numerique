import { DismissalReason573, DismissalReason675 } from "../../conventions";
import { SupportedCc } from "..";
import { DismissalReasonDefault } from "../dismissal-reason";
import type { IDismissalReason } from "../types/dismissalReason";

export class DismissalReasonFactory {
  create(idcc: string): IDismissalReason {
    switch (idcc) {
      case SupportedCc.IDCC0573:
        return new DismissalReason573();
      case SupportedCc.IDCC0675:
        return new DismissalReason675();
      case SupportedCc.default:
      default:
        return new DismissalReasonDefault();
    }
  }
}
