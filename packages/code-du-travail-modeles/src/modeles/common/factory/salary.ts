import { ReferenceSalaryLegal } from "../../base";
import {
  ReferenceSalary1483,
  ReferenceSalary1606,
  ReferenceSalary2120,
  ReferenceSalary2609,
  ReferenceSalary2614,
} from "../../conventions";
import { ReferenceSalary16 } from "../../conventions/16_transports_routiers";
import { ReferenceSalary44 } from "../../conventions/44_industries_chimiques";
import { ReferenceSalary86 } from "../../conventions/86_publicite_francaise";
import { ReferenceSalary292 } from "../../conventions/292_plasturgie";
import { ReferenceSalary573 } from "../../conventions/573_commerces_de_gros";
import { ReferenceSalary675 } from "../../conventions/675_habillement_commerce_succursales";
import { ReferenceSalary1486 } from "../../conventions/1486_bureaux_etudes_techniques";
import { ReferenceSalary1516 } from "../../conventions/1516_organismes_formation";
import { ReferenceSalary1527 } from "../../conventions/1527_immobilier";
import { ReferenceSalary1672 } from "../../conventions/1672_societes_assurances";
import { ReferenceSalary1702 } from "../../conventions/1702_ouvriers_travaux_public";
import { ReferenceSalary1740 } from "../../conventions/1740_batiment_region_parisienne";
import { ReferenceSalary2098 } from "../../conventions/2098_personnel_presta_service_tertiaire";
import { ReferenceSalary2148 } from "../../conventions/2148_telecommunications/salary";
import { ReferenceSalary2596 } from "../../conventions/2596_coiffure/salary";
import { ReferenceSalary3239 } from "../../conventions/3239_particuliers_employeurs_domicile";
import type { IReferenceSalary } from "..";
import { SupportedCc } from "..";

export class ReferenceSalaryFactory {
  create<T extends SupportedCc>(idcc: T): IReferenceSalary<T> {
    switch (idcc) {
      case SupportedCc.IDCC1516:
        return new ReferenceSalary1516() as IReferenceSalary<T>;
      case SupportedCc.IDCC1606:
        return new ReferenceSalary1606() as IReferenceSalary<T>;
      case SupportedCc.IDCC1486:
        return new ReferenceSalary1486() as IReferenceSalary<T>;
      case SupportedCc.IDCC1527:
        return new ReferenceSalary1527() as IReferenceSalary<T>;
      case SupportedCc.IDCC3239:
        return new ReferenceSalary3239() as IReferenceSalary<T>;
      case SupportedCc.IDCC0016:
        return new ReferenceSalary16() as any;
      case SupportedCc.IDCC0044:
        return new ReferenceSalary44() as IReferenceSalary<T>;
      case SupportedCc.IDCC0573:
        return new ReferenceSalary573() as IReferenceSalary<T>;
      case SupportedCc.IDCC2596:
        return new ReferenceSalary2596() as IReferenceSalary<T>;
      case SupportedCc.IDCC2098:
        return new ReferenceSalary2098() as IReferenceSalary<T>;
      case SupportedCc.IDCC2609:
        return new ReferenceSalary2609() as IReferenceSalary<T>;
      case SupportedCc.IDCC2148:
        return new ReferenceSalary2148() as IReferenceSalary<T>;
      case SupportedCc.IDCC2614:
        return new ReferenceSalary2614() as IReferenceSalary<T>;
      case SupportedCc.IDCC0675:
        return new ReferenceSalary675() as IReferenceSalary<T>;
      case SupportedCc.IDCC1672:
        return new ReferenceSalary1672() as IReferenceSalary<T>;
      case SupportedCc.IDCC0086:
        return new ReferenceSalary86() as IReferenceSalary<T>;
      case SupportedCc.IDCC1483:
        return new ReferenceSalary1483() as IReferenceSalary<T>;
      case SupportedCc.IDCC1702:
        return new ReferenceSalary1702() as IReferenceSalary<T>;
      case SupportedCc.IDCC1740:
        return new ReferenceSalary1740() as IReferenceSalary<T>;
      case SupportedCc.IDCC2120:
        return new ReferenceSalary2120() as IReferenceSalary<T>;
      case SupportedCc.IDCC0292:
        return new ReferenceSalary292() as IReferenceSalary<T>;
      case SupportedCc.default:
      default:
        return new ReferenceSalaryLegal() as IReferenceSalary<T>;
    }
  }
}
