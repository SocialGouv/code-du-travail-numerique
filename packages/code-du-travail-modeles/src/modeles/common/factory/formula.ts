import { Formula44 } from "../../conventions/44_industries_chimiques";
import { Formula573 } from "../../conventions/573_commerces_de_gros";
import { Formula1516 } from "../../conventions/1516_organismes_formation";
import { Formula1596 } from "../../conventions/1596_batiment_ouvriers_employes";
import { Formula1597 } from "../../conventions/1597_batiment_employes_ouvriers_bis";
import { Formula3127 } from "../../conventions/3127_entreprises_services_a_la_personne";
import type { IFormula } from "..";
import { SupportedCcIndemniteLicenciement } from "../types";

export class FormuleFactory {
  create<T extends SupportedCcIndemniteLicenciement>(
    idcc: T
  ): IFormula<T> | undefined {
    switch (idcc) {
      case SupportedCcIndemniteLicenciement.IDCC1516:
        return new Formula1516() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC3127:
        return new Formula3127() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1596:
        return new Formula1596() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1597:
        return new Formula1597() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC0573:
        return new Formula573() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC0044:
        return new Formula44() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return undefined;
    }
  }
}
