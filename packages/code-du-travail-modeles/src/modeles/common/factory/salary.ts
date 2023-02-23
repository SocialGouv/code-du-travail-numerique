import { ReferenceSalaryLegal } from "../../base";
import { ReferenceSalary2609 } from "../../conventions";
import { ReferenceSalary16 } from "../../conventions/16_transports_routiers";
import { ReferenceSalary0029 } from "../../conventions/29_hospitalisation_privee_but_non_lucratif";
import { ReferenceSalary44 } from "../../conventions/44_industries_chimiques";
import { ReferenceSalary413 } from "../../conventions/413_handicap";
import { ReferenceSalary573 } from "../../conventions/573_commerces_de_gros";
import { ReferenceSalary675 } from "../../conventions/675_habillement_commerce_succursales";
import { ReferenceSalary1486 } from "../../conventions/1486_bureaux_etudes_techniques";
import { ReferenceSalary1516 } from "../../conventions/1516_organismes_formation";
import { ReferenceSalary1527 } from "../../conventions/1527_immobilier";
import { ReferenceSalary2098 } from "../../conventions/2098_personnel_presta_service_tertiaire";
import { ReferenceSalary3239 } from "../../conventions/3239_particuliers_employeurs_domicile";
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
      case SupportedCcIndemniteLicenciement.IDCC2098:
        return new ReferenceSalary2098() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC2609:
        return new ReferenceSalary2609() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC0675:
        return new ReferenceSalary675() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new ReferenceSalaryLegal() as IReferenceSalary<T>;
    }
  }
}
