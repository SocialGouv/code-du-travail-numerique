import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export enum CatPro2596 {
  agentsMaitrise = "'Agents de maîtrise'",
  cadres = "'Cadres'",
  coiffeur = "'Emplois techniques et de coiffeurs'",
  esthetique = "'Emplois de l'esthétique-cosmétique'",
  nonTechnique = "'Emplois non techniques'",
}

export type CC2596ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  catPro: CatPro2596;
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary2596
  implements IReferenceSalary<SupportedCc.IDCC2596>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC2596> {
    return {
      catPro: args[
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle"
      ] as CatPro2596,
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
      salairesPendantPreavis: args.noticeSalaryPeriods
        ? JSON.parse(args.noticeSalaryPeriods)
        : [],
    };
  }

  computeReferenceSalary({
    salaires = [],
    salairesPendantPreavis = [],
    catPro,
  }: ReferenceSalaryProps<SupportedCc.IDCC2596>): number {
    if (
      catPro === CatPro2596.coiffeur ||
      catPro === CatPro2596.esthetique ||
      catPro === CatPro2596.nonTechnique
    ) {
      return new ReferenceSalaryLegal().computeReferenceSalary({
        salaires,
      });
    } else {
      const rankedSalaires = rankByMonthArrayDescFrench(salaires);
      const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
        salairesPendantPreavis
      );
      const salaryValues = rankedSalaires
        .map((a) => a.value)
        .filter(nonNullable);

      const totalSalaryValues = [
        ...rankedSalairesPendantPreavis.map((a) => a.value).filter(nonNullable),
        ...salaryValues,
      ].slice(0, 12);

      const primesPendantPreavis = rankedSalairesPendantPreavis
        .map((v) => v.prime)
        .filter(nonNullable);

      return (
        (sum(totalSalaryValues) + sum(primesPendantPreavis)) /
        totalSalaryValues.length
      );
    }
  }
}
