import { SeniorityLegal } from "../../base";
import {
  Seniority16,
  Seniority44,
  Seniority413,
  Seniority650,
  Seniority1090,
  Seniority1486,
  Seniority1518,
  Seniority1527,
  Seniority1996,
  Seniority2098,
  Seniority2216,
  Seniority2511,
  Seniority2609,
  Seniority2941,
  Seniority3043,
  Seniority3239,
} from "../../conventions";
import { Seniority1517 } from "../../conventions/1517_commerces_de_detail_non_alimentaires";
import { SupportedCcIndemniteLicenciement } from "../index";
import type { ISeniority } from "../types";

export class SeniorityFactory {
  create<T extends SupportedCcIndemniteLicenciement>(
    idcc: T | null
  ): ISeniority<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC2511:
        return new Seniority2511();
      case SupportedCcIndemniteLicenciement.IDCC3043:
        return new Seniority3043();
      case SupportedCcIndemniteLicenciement.IDCC1090:
        return new Seniority1090();
      case SupportedCcIndemniteLicenciement.IDCC1518:
        return new Seniority1518();
      case SupportedCcIndemniteLicenciement.IDCC2941:
        return new Seniority2941();
      case SupportedCcIndemniteLicenciement.IDCC1486:
        return new Seniority1486();
      case SupportedCcIndemniteLicenciement.IDCC1527:
        return new Seniority1527();
      case SupportedCcIndemniteLicenciement.IDCC0016:
        return new Seniority16() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC3239:
        return new Seniority3239();
      case SupportedCcIndemniteLicenciement.IDCC650:
        return new Seniority650();
      case SupportedCcIndemniteLicenciement.IDCC2216:
        return new Seniority2216();
      case SupportedCcIndemniteLicenciement.IDCC0044:
        return new Seniority44();
      case SupportedCcIndemniteLicenciement.IDCC1996:
        return new Seniority1996();
      case SupportedCcIndemniteLicenciement.IDCC2098:
        return new Seniority2098();
      case SupportedCcIndemniteLicenciement.IDCC2609:
        return new Seniority2609();
      case SupportedCcIndemniteLicenciement.IDCC413:
        return new Seniority413() as ISeniority<T>;
      case SupportedCcIndemniteLicenciement.IDCC1517:
        return new Seniority1517();
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new SeniorityLegal();
    }
  }
}
