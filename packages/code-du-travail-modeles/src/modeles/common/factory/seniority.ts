import { SeniorityLegal } from "../../base";
import { Seniority16 } from "../../conventions/16_transports_routiers";
import { Seniority44 } from "../../conventions/44_industries_chimiques";
import { Seniority1090 } from "../../conventions/1090_automobiles";
import { Seniority1486 } from "../../conventions/1486_bureaux_etudes_techniques";
import { SenioritY1527 } from "../../conventions/1527_immobilier";
import { Seniority2216 } from "../../conventions/2216_commerces_detail_alimentation";
import { Seniority2941 } from "../../conventions/2941_aide_accompagnement_soins_services_domicile";
import { getMotifs } from "../motifs";
import type { ISeniority } from "../types";
import { SupportedCcIndemniteLicenciement } from "../types";

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
