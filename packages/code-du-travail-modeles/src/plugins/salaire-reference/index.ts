import { SupportedCcIndemniteLicenciement } from "..";
import { ReferenceSalary16 } from "./16_transports_routiers";
import { ReferenceSalary0029 } from "./29-hospitalisation-privee-but-non-lucratif";
import { ReferenceSalary44 } from "./44_industries_chimiques";
import { ReferenceSalary413 } from "./413_handicap";
import { ReferenceSalary1486 } from "./1486_bureaux_etudes_techniques";
import { ReferenceSalary1516 } from "./1516_organismes_formation";
import { ReferenceSalary1527 } from "./1527-immobilier";
import { ReferenceSalary3239 } from "./3239_particuliers_employeurs_domicile";
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
      case SupportedCcIndemniteLicenciement.IDCC0029:
        return new ReferenceSalary0029() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new ReferenceSalaryLegal() as IReferenceSalary<T>;
    }
  }
}

export * from "./types";
