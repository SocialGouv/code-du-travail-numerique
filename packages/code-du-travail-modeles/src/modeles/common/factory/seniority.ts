import { LEGAL_MOTIFS, SeniorityLegal } from "../../base";
import {
  MOTIFS_650,
  MOTIFS_1518,
  MOTIFS_2098,
  MOTIFS_2511,
  MOTIFS_2609,
  MOTIFS_3043,
  MOTIFS_3239,
  Seniority16,
  Seniority44,
  Seniority413,
  Seniority1090,
  Seniority1486,
  Seniority1527,
  Seniority2216,
  Seniority2941,
} from "../../conventions";
import { Seniority1517 } from "../../conventions/1517_commerces_de_detail_non_alimentaires";
import type { ISeniority } from "../types";
import { SupportedCcIndemniteLicenciement } from "../types";

export class SeniorityFactory {
  create<T extends SupportedCcIndemniteLicenciement>(idcc: T): ISeniority<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC2511:
        return new SeniorityLegal(MOTIFS_2511) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC3043:
        return new SeniorityLegal(MOTIFS_3043) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1090:
        return new Seniority1090() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1518:
        return new SeniorityLegal(MOTIFS_1518) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC2941:
        return new Seniority2941() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1486:
        return new Seniority1486() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1527:
        return new Seniority1527() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC0016:
        return new Seniority16() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC3239:
        return new SeniorityLegal(MOTIFS_3239) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC650:
        return new SeniorityLegal(MOTIFS_650);
      case SupportedCcIndemniteLicenciement.IDCC2216:
        return new Seniority2216() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC0044:
        return new Seniority44() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC2098:
        return new SeniorityLegal(MOTIFS_2098) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC2609:
        return new SeniorityLegal(MOTIFS_2609) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC413:
        return new Seniority413() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1517:
        return new Seniority1517(LEGAL_MOTIFS) as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new SeniorityLegal(LEGAL_MOTIFS) as ISeniority<T>;
    }
  }
}
