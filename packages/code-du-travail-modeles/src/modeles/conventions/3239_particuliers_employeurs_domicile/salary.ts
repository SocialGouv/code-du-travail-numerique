import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";

export enum CatPro3239 {
  salarieParticulierEmployeur = "Salarié du particulier employeur",
  assistantMaternel = "Assistant maternel",
}

export type CC3239ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  catPro: CatPro3239;
};

export class ReferenceSalary3239
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC3239> {
  /**
   * Règle :
   * - si la catégorie professionnelle est "Assistant maternel" et que le licenciement n'est pas dû à un retrait d'Agrément
   * - S
   * S : total des salaires perçus depuis l'engagement (brut)
   * Note : Cette information est utilisée côté publicodes
   *
   * - Dans le cas où c'est le salarié particulier employeur, on renvoie au légal
   **/
  computeReferenceSalary({
    salaires = [],
    catPro,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC3239>): number {
    if (catPro === CatPro3239.salarieParticulierEmployeur) {
      return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });
    }
    return 0;
  }
}
