import {
  DismissalReason44,
  DismissalReason573,
  DismissalReason1501,
  DismissalReason1996,
} from "../../conventions";
import { SupportedCcIndemniteLicenciement } from "..";
import { DismissalReasonDefault } from "../dismissal-reason";
import type { IDismissalReason } from "../types/dismissalReason";

export class DismissalReasonFactory {
  create(idcc: string): IDismissalReason {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC0573:
        return new DismissalReason573();
      case SupportedCcIndemniteLicenciement.IDCC0044:
        return new DismissalReason44();
      case SupportedCcIndemniteLicenciement.IDCC1501:
        return new DismissalReason1501();
      case SupportedCcIndemniteLicenciement.IDCC1996:
        return new DismissalReason1996();
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new DismissalReasonDefault();
    }
  }
}
