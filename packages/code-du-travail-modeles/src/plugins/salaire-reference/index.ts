import { SupportedCcIndemniteLicenciement } from "..";
import { ReferenceSalary413 } from "./413_handicap";
import { ReferenceSalary1516 } from "./1516_organismes_formation";
import { ReferenceSalaryLegal } from "./legal";
import type { IReferenceSalary } from "./types";

export class ReferenceSalaryFactory {
  create<T extends SupportedCcIndemniteLicenciement>(
    idcc: T
  ): IReferenceSalary<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1516:
        return new ReferenceSalary1516() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC413:
        return new ReferenceSalary413() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new ReferenceSalaryLegal() as IReferenceSalary<T>;
    }
  }
}

export * from "./types";
