import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import {
  nonNullable,
  QuestionOuiNon,
  rankByMonthArrayDescFrench,
  sum,
} from "../../common";

export enum CatPro573 {
  autres = "Autres salariés",
  agents = "Agents de maîtrise, techniciens et assimilés",
  cadres = "Cadres",
}

export type CC573ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  licenciementEco: QuestionOuiNon;
};

export class ReferenceSalary573
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC0573> {
  /**
   * Règle :
   * - si le licenciement est pour des raisons économiques
   * S / 12
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * - sinon c'est le légal qui s'applique
   **/
  computeReferenceSalary({
    salaires = [],
    licenciementEco = QuestionOuiNon.non,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0573>): number {
    if (licenciementEco === QuestionOuiNon.oui) {
      const rankedSalaires = rankByMonthArrayDescFrench(salaires);
      const salaryValues = rankedSalaires
        .map((a) => a.value)
        .filter(nonNullable);
      return salaryValues.length === 0
        ? 0
        : sum(salaryValues) / salaires.length;
    }
    return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });
  }
}
