import {
  DismissalReason573,
  DismissalReason1702,
  DismissalReason2216,
  DismissalReason2120,
} from "../../conventions";
import { SupportedCc } from "..";
import { DismissalReasonDefault } from "../dismissal-reason";
import type { IDismissalReason } from "../types/dismissalReason";

export class DismissalReasonFactory {
  create(idcc: string): IDismissalReason {
    switch (idcc) {
      case SupportedCc.IDCC0573:
        return new DismissalReason573();
      case SupportedCc.IDCC1702:
        return new DismissalReason1702();
      case SupportedCc.IDCC2120:
        return new DismissalReason2120();
      case SupportedCc.IDCC2216:
        return new DismissalReason2216();
      case SupportedCc.default:
      default:
        return new DismissalReasonDefault();
    }
  }
}
