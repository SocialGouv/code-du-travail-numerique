import { Formula16 } from "../../conventions/16_transports_routiers";
import { Formula44 } from "../../conventions/44_industries_chimiques";
import { Formula413 } from "../../conventions/413_handicap";
import { Formula573 } from "../../conventions/573_commerces_de_gros";
import { Formula650 } from "../../conventions/650_metallurgie_ingenieurs_cadres";
import { Formula1516 } from "../../conventions/1516_organismes_formation";
import { Formula1596 } from "../../conventions/1596_batiment_ouvriers_employes";
import { Formula1597 } from "../../conventions/1597_batiment_employes_ouvriers_bis";
import { Formula1979 } from "../../conventions/1979_hotels_cafes_restaurants";
import { Formula2264 } from "../../conventions/2264_hospitalisation_privees";
import { Formula3043 } from "../../conventions/3043_entreprises_proprete";
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
      case SupportedCcIndemniteLicenciement.IDCC2264:
        return new Formula2264() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1979:
        return new Formula1979() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC3043:
        return new Formula3043() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC413:
        return new Formula413() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC3127:
        return new Formula3127() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1596:
        return new Formula1596() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1597:
        return new Formula1597() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC650:
        return new Formula650() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC0016:
        return new Formula16() as IFormula<T>;
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
