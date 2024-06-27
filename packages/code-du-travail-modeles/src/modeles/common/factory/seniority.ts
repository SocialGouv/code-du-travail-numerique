import { SeniorityLegal } from "../../base";
import {
  Seniority16,
  Seniority44,
  Seniority176,
  Seniority275,
  Seniority0292,
  Seniority650,
  Seniority1090,
  Seniority1404,
  Seniority1483,
  Seniority1486,
  Seniority1505,
  Seniority1516,
  Seniority1517,
  Seniority1518,
  Seniority1527,
  Seniority1596,
  Seniority1597,
  Seniority1606,
  Seniority1672,
  Seniority1702,
  Seniority1740,
  Seniority1996,
  Seniority2098,
  Seniority2120,
  Seniority2148,
  Seniority2216,
  Seniority2511,
  Seniority2609,
  Seniority2614,
  Seniority2941,
  Seniority3043,
  Seniority3239,
  Seniority3248,
} from "../../conventions";
import type { ISeniority } from "../index";
import { SupportedCc } from "../index";

export class SeniorityFactory {
  create<T extends SupportedCc>(idcc: T | null): ISeniority<SupportedCc> {
    switch (idcc) {
      case SupportedCc.IDCC2511:
        return new Seniority2511();
      case SupportedCc.IDCC3043:
        return new Seniority3043();
      case SupportedCc.IDCC1090:
        return new Seniority1090();
      case SupportedCc.IDCC1518:
        return new Seniority1518();
      case SupportedCc.IDCC2941:
        return new Seniority2941();
      case SupportedCc.IDCC1486:
        return new Seniority1486();
      case SupportedCc.IDCC1527:
        return new Seniority1527();
      case SupportedCc.IDCC0016:
        return new Seniority16() as ISeniority<SupportedCc.IDCC0016>;
      case SupportedCc.IDCC0292:
        return new Seniority0292();
      case SupportedCc.IDCC3239:
        return new Seniority3239();
      case SupportedCc.IDCC650:
        return new Seniority650() as ISeniority<SupportedCc.IDCC650>;
      case SupportedCc.IDCC2216:
        return new Seniority2216();
      case SupportedCc.IDCC0044:
        return new Seniority44();
      case SupportedCc.IDCC1996:
        return new Seniority1996();
      case SupportedCc.IDCC2098:
        return new Seniority2098();
      case SupportedCc.IDCC2609:
        return new Seniority2609();
      case SupportedCc.IDCC1516:
        return new Seniority1516();
      case SupportedCc.IDCC1517:
        return new Seniority1517();
      case SupportedCc.IDCC2614:
        return new Seniority2614();
      case SupportedCc.IDCC1505:
        return new Seniority1505();
      case SupportedCc.IDCC1596:
        return new Seniority1596();
      case SupportedCc.IDCC1597:
        return new Seniority1597();
      case SupportedCc.IDCC275:
        return new Seniority275();
      case SupportedCc.IDCC1404:
        return new Seniority1404();
      case SupportedCc.IDCC1606:
        return new Seniority1606();
      case SupportedCc.IDCC1672:
        return new Seniority1672() as ISeniority<SupportedCc.IDCC1672>;
      case SupportedCc.IDCC1483:
        return new Seniority1483();
      case SupportedCc.IDCC1702:
        return new Seniority1702();
      case SupportedCc.IDCC1740:
        return new Seniority1740();
      case SupportedCc.IDCC2148:
        return new Seniority2148();
      case SupportedCc.IDCC0176:
        return new Seniority176();
      case SupportedCc.IDCC2120:
        return new Seniority2120();
      case SupportedCc.IDCC3248:
        return new Seniority3248() as ISeniority<SupportedCc.IDCC3248>;
      case SupportedCc.default:
      default:
        return new SeniorityLegal();
    }
  }
}
