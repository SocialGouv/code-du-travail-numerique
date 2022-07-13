import { SupportedCcIndemniteLicenciement } from "../types";
import { SeniorityLegal } from "./legal";
import { getMotifs } from "./motifs";
import type { ISeniority } from "./types";

export class SeniorityFactory {
  create<T extends SupportedCcIndemniteLicenciement>(idcc: T): ISeniority<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC2511:
        return new SeniorityLegal(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC2511)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new SeniorityLegal(
          getMotifs(SupportedCcIndemniteLicenciement.default)
        ) as ISeniority<T>;
    }
  }
}

export * from "./motifs";
export * from "./types";
