import { ReferenceSalaryLegal } from "../../base";
import {
  ReferenceSalary16,
  ReferenceSalary0029,
  ReferenceSalary44,
  ReferenceSalary413,
  ReferenceSalary573,
  ReferenceSalary1486,
  ReferenceSalary1516,
  ReferenceSalary1527,
  ReferenceSalary2098,
  ReferenceSalary2148,
  ReferenceSalary2596,
  ReferenceSalary2609,
  ReferenceSalary3239,
} from "../../conventions";
import type { IReferenceSalary } from "..";
import { SupportedCcIndemniteLicenciement } from "..";

export class ReferenceSalaryFactory {
  create<T extends SupportedCcIndemniteLicenciement>(
    idcc: T
  ): IReferenceSalary<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1516:
        return new ReferenceSalary1516() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC413:
        return new ReferenceSalary413() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC1486:
        return new ReferenceSalary1486() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC1527:
        return new ReferenceSalary1527() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC3239:
        return new ReferenceSalary3239() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC0016:
        return new ReferenceSalary16() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC0044:
        return new ReferenceSalary44() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC0573:
        return new ReferenceSalary573() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC0029:
        return new ReferenceSalary0029() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC2596:
        return new ReferenceSalary2596() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC2098:
        return new ReferenceSalary2098() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC2609:
        return new ReferenceSalary2609() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC2148:
        return new ReferenceSalary2148() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new ReferenceSalaryLegal() as IReferenceSalary<T>;
    }
  }
}
