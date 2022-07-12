import { SupportedCcIndemniteLicenciement } from "../types";
import { MOTIFS_2511 } from "./2511_sport";
import { LEGAL_MOTIFS, SeniorityLegal } from "./legal";
import type { ISeniority } from "./types";

export class SeniorityFactory {
  create<T extends SupportedCcIndemniteLicenciement>(idcc: T): ISeniority<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC2511:
        return new SeniorityLegal(MOTIFS_2511) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new SeniorityLegal(LEGAL_MOTIFS) as ISeniority<T>;
    }
  }
}

export * from "./types";
