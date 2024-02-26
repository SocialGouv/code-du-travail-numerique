import { SeniorityLegal } from "../../base";
import {
  Seniority16,
  Seniority44,
  Seniority176,
  Seniority275,
  Seniority0292,
  Seniority413,
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
import type { SeniorityType } from "../index";
import { SupportedCcIndemniteLicenciement } from "../index";

export class SeniorityFactory {
  create<T extends SupportedCcIndemniteLicenciement>(
    idcc: T | null = null,
    type: SeniorityType = "indemnite-licenciement"
  ): any {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC2511:
        return new Seniority2511(type);
      case SupportedCcIndemniteLicenciement.IDCC3043:
        return new Seniority3043(type);
      case SupportedCcIndemniteLicenciement.IDCC1090:
        return new Seniority1090(type);
      case SupportedCcIndemniteLicenciement.IDCC1518:
        return new Seniority1518(type);
      case SupportedCcIndemniteLicenciement.IDCC2941:
        return new Seniority2941(type);
      case SupportedCcIndemniteLicenciement.IDCC1486:
        return new Seniority1486(type);
      case SupportedCcIndemniteLicenciement.IDCC1527:
        return new Seniority1527(type);
      case SupportedCcIndemniteLicenciement.IDCC0016:
        return new Seniority16(type);
      case SupportedCcIndemniteLicenciement.IDCC0292:
        return new Seniority0292(type);
      case SupportedCcIndemniteLicenciement.IDCC3239:
        return new Seniority3239(type);
      case SupportedCcIndemniteLicenciement.IDCC650:
        return new Seniority650(type);
      case SupportedCcIndemniteLicenciement.IDCC2216:
        return new Seniority2216(type);
      case SupportedCcIndemniteLicenciement.IDCC0044:
        return new Seniority44(type);
      case SupportedCcIndemniteLicenciement.IDCC1996:
        return new Seniority1996(type);
      case SupportedCcIndemniteLicenciement.IDCC2098:
        return new Seniority2098(type);
      case SupportedCcIndemniteLicenciement.IDCC2609:
        return new Seniority2609(type);
      case SupportedCcIndemniteLicenciement.IDCC413:
        return new Seniority413(type);
      case SupportedCcIndemniteLicenciement.IDCC1516:
        return new Seniority1516(type);
      case SupportedCcIndemniteLicenciement.IDCC1517:
        return new Seniority1517(type);
      case SupportedCcIndemniteLicenciement.IDCC2614:
        return new Seniority2614(type);
      case SupportedCcIndemniteLicenciement.IDCC1505:
        return new Seniority1505(type);
      case SupportedCcIndemniteLicenciement.IDCC1596:
        return new Seniority1596(type);
      case SupportedCcIndemniteLicenciement.IDCC1597:
        return new Seniority1597(type);
      case SupportedCcIndemniteLicenciement.IDCC275:
        return new Seniority275(type);
      case SupportedCcIndemniteLicenciement.IDCC1404:
        return new Seniority1404(type);
      case SupportedCcIndemniteLicenciement.IDCC1606:
        return new Seniority1606(type);
      case SupportedCcIndemniteLicenciement.IDCC1672:
        return new Seniority1672(type);
      case SupportedCcIndemniteLicenciement.IDCC1483:
        return new Seniority1483(type);
      case SupportedCcIndemniteLicenciement.IDCC1702:
        return new Seniority1702(type);
      case SupportedCcIndemniteLicenciement.IDCC1740:
        return new Seniority1740(type);
      case SupportedCcIndemniteLicenciement.IDCC2148:
        return new Seniority2148(type);
      case SupportedCcIndemniteLicenciement.IDCC0176:
        return new Seniority176(type);
      case SupportedCcIndemniteLicenciement.IDCC2120:
        return new Seniority2120(type);
      case SupportedCcIndemniteLicenciement.IDCC3248:
        return new Seniority3248(type);
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new SeniorityLegal(type);
    }
  }
}
