import { ReferenceSalaryLegal } from "../../base";
import {
  ReferenceSalary1483,
  ReferenceSalary1606,
  ReferenceSalary2609,
  ReferenceSalary2614,
} from "../../conventions";
import { ReferenceSalary16 } from "../../conventions/16_transports_routiers";
import { ReferenceSalary0029 } from "../../conventions/29_hospitalisation_privee_but_non_lucratif";
import { ReferenceSalary44 } from "../../conventions/44_industries_chimiques";
import { ReferenceSalary86 } from "../../conventions/86_publicite_francaise";
import { ReferenceSalary413 } from "../../conventions/413_handicap";
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
import { SupportedCcIndemniteLicenciement } from "..";

export class ReferenceSalaryFactory {
  create<T extends SupportedCcIndemniteLicenciement>(
    idcc: T
  ): IReferenceSalary<T> {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1516:
        return new ReferenceSalary1516() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC1606:
        return new ReferenceSalary1606() as IReferenceSalary<T>;
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
      case SupportedCcIndemniteLicenciement.IDCC2614:
        return new ReferenceSalary2614() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC0675:
        return new ReferenceSalary675() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC1672:
        return new ReferenceSalary1672() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC0086:
        return new ReferenceSalary86() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC1483:
        return new ReferenceSalary1483() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC1702:
        return new ReferenceSalary1702() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.IDCC1740:
        return new ReferenceSalary1740() as IReferenceSalary<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new ReferenceSalaryLegal() as IReferenceSalary<T>;
    }
  }
}
