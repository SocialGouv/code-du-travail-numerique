import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC675ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  isAgentMaitriseOrCadre: boolean;
};

export class ReferenceSalary675
  implements IReferenceSalary<SupportedCc.IDCC0675>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC0675> {
    const catPro =
      args[
        "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle"
      ];
    const isAgentMaitriseOrCadre =
      catPro === "Agents de maîtrise" || catPro === "Cadres";
    return {
      isAgentMaitriseOrCadre,
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
    };
  }

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
  }: ReferenceSalaryProps<SupportedCc.IDCC0675>): number {
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
  }: ReferenceSalaryProps<SupportedCc.IDCC0675>): Record<
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
