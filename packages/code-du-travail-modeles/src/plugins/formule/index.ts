import { SupportedCcIndemniteLicenciement } from "../types";
import { Formula16 } from "./16_transports_routiers";
import { Formula413 } from "./413_handicap";
import { Formula650 } from "./650_metallurgie_ingenieurs_cadres";
import { Formula1486 } from "./1486_bureaux_etudes_techniques";
import { Formula1501 } from "./1501_restauration_rapide";
import { Formula1516 } from "./1516_organismes_formation";
import { Formula1597 } from "./1597_batiment_employes_ouvriers_bis";
import { Formula1979 } from "./1979_hotels_cafes_restaurants";
import { Formula2216 } from "./2216_commerces_detail_alimentation";
import { Formula2264 } from "./2264_hospitalisation_privee";
import { Formula3043 } from "./3043_entreprises_proprete";
import { Formula3127 } from "./3127_entreprises_services_a_la_personne";
import { Formula3239 } from "./3239_particuliers_employeurs_domicile";
import { FormulaLegal } from "./legal";
import type { IFormula } from "./types";

export class FormuleFactory {
  create<T extends SupportedCcIndemniteLicenciement>(idcc: T): IFormula<T> {
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
      case SupportedCcIndemniteLicenciement.IDCC1597:
        return new Formula1597() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1486:
        return new Formula1486() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC3239:
        return new Formula3239() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC650:
        return new Formula650() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC2216:
        return new Formula2216() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC0016:
        return new Formula16() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.IDCC1501:
        return new Formula1501() as IFormula<T>;
      case SupportedCcIndemniteLicenciement.default:
      default:
        return new FormulaLegal() as IFormula<T>;
    }
  }
}

export * from "./types";
