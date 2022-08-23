import { SupportedCcIndemniteLicenciement } from "../types";
import { Seniority1090 } from "./1090_automobiles";
import { Seniority2941 } from "./2941_aide_accompagnement_soins_services_domicile";
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
      case SupportedCcIndemniteLicenciement.IDCC1518:
        return new SeniorityLegal(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC1518)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC2941:
        return new Seniority2941(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC2941)
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
