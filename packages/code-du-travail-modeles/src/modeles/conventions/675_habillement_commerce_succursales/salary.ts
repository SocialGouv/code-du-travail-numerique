import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC675ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  isAgentMaitriseOrCadre: boolean;
};

export class ReferenceSalary675
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC0675>
{
  /**
   * si Agents de maîtrise et techniciens ou Cadres
   * - S/12
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * Sinon
   * - soit S/3
   * S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * - soit S/12
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   */
  computeReferenceSalary({
    salaires = [],
    isAgentMaitriseOrCadre = false,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0675>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const salaireMoyen12DerniersMois = sum(salaryValues) / 12;
    const salaryValues3DernierMois = rankedSalaires
      .map((a) => a.value)
      .filter(nonNullable)
      .slice(0, 3);
    const salaireMoyen3DerniersMois = sum(salaryValues3DernierMois) / 3;

    if (isAgentMaitriseOrCadre) {
      return salaireMoyen12DerniersMois;
    } else {
      return Math.max(salaireMoyen12DerniersMois, salaireMoyen3DerniersMois);
    }
  }

  computeExtraInfo({
    salaires = [],
    isAgentMaitriseOrCadre = false,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0675>): Record<
    string,
    number | string
  > {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues3DernierMois = rankedSalaires
      .map((a) => a.value)
      .filter(nonNullable)
      .slice(0, 3);
    const salaireMoyen3DerniersMois = sum(salaryValues3DernierMois) / 3;

    if (!isAgentMaitriseOrCadre) {
      return {
        "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . salaire mensuel des 3 derniers mois":
          salaireMoyen3DerniersMois,
      };
    }
    return {};
  }
}
