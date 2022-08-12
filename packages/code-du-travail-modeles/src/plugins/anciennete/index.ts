import { SupportedCcIndemniteLicenciement } from "../types";
import { Seniority1090 } from "./1090_automobiles";
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
      case SupportedCcIndemniteLicenciement.IDCC3043:
        return new SeniorityLegal(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC3043)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1090:
        return new Seniority1090(
          getMotifs(SupportedCcIndemniteLicenciement.default)
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
