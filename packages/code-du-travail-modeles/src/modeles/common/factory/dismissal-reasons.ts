import {
  DismissalReason16,
  DismissalReason573,
  DismissalReason675,
  DismissalReason1486,
  DismissalReason1501,
  DismissalReason1702,
  DismissalReason1996,
  DismissalReason2098,
  DismissalReason2120,
  DismissalReason2216,
} from "../../conventions";
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
      case SupportedCc.IDCC0016:
        return new DismissalReason16();
      case SupportedCc.IDCC1501:
        return new DismissalReason1501();
      case SupportedCc.IDCC1996:
        return new DismissalReason1996();
      case SupportedCc.IDCC1486:
        return new DismissalReason1486();
      case SupportedCc.IDCC2098:
        return new DismissalReason2098();
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
