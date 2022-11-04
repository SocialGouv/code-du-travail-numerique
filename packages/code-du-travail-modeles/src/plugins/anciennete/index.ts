import { SupportedCcIndemniteLicenciement } from "../types";
import { Seniority16 } from "./16_transports_routiers";
import { Seniority44 } from "./44_industries_chimiques";
import { Seniority1090 } from "./1090_automobiles";
import { Seniority1486 } from "./1486_bureaux_etudes_techniques";
import { SenioritY1527 } from "./1527-immobilier";
import { Seniority2216 } from "./2216_commerces_detail_alimentation";
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
      case SupportedCcIndemniteLicenciement.IDCC1486:
        return new Seniority1486(
          getMotifs(SupportedCcIndemniteLicenciement.default)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1527:
        return new SenioritY1527(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC1527)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC0016:
        return new Seniority16(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC0016)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC3239:
        return new SeniorityLegal(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC3239)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC650:
        return new SeniorityLegal(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC650)
        );
      case SupportedCcIndemniteLicenciement.IDCC2216:
        return new Seniority2216(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC2216)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC0044:
        return new Seniority44(
          getMotifs(SupportedCcIndemniteLicenciement.IDCC0044)
        ) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new SeniorityLegal(
          getMotifs(SupportedCcIndemniteLicenciement.default)
        ) as ISeniority<T>;
    }
  }
}

export * from "./motif-keys";
export * from "./motifs";
export * from "./types";
