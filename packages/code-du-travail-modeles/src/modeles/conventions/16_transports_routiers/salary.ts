import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC16ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  category: CategoryPro16;
  hasVariablePay: boolean;
  driveInability?: "definitive" | "temporary";
};

export type CategoryPro16 =
  | "'Employés'"
  | "'Ingénieurs et cadres'"
  | "'Ouvriers'"
  | "'TAM'";

export class ReferenceSalary16
  implements IReferenceSalary<SupportedCc.IDCC0016>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC0016> {
    const category = args[
      "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle"
    ] as CategoryPro16;
    let driveInability: "definitive" | "temporary" | undefined = undefined;
    if (category === "'Ouvriers'") {
      const driveInabilityTemporary =
        args[
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite"
        ];
      const driveInabilityDefinitive =
        args[
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive"
        ];
      driveInability =
        driveInabilityTemporary === "'Oui'" &&
        driveInabilityDefinitive === "'Oui'"
          ? "definitive"
          : driveInabilityTemporary === "'Oui'"
            ? "temporary"
            : undefined;
    }
    return {
      category,
      driveInability,
      hasVariablePay: args.hasVariablePay === "oui",
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
    };
  }

  computeReferenceSalary(
    props: ReferenceSalaryProps<SupportedCc.IDCC0016>
  ): number {
    if (props.salaires.length === 0) {
      return 0;
    }
    switch (props.category) {
      case "'Employés'":
        return this.computeThreeLastMonthsAverageWithPrimes(props);
      case "'TAM'":
      case "'Ingénieurs et cadres'":
        return this.computeReferenceSalaryDependsOnVariable(props);
      case "'Ouvriers'":
        switch (props.driveInability) {
          case undefined:
            return this.computeThreeLastMonthsAverageWithPrimes(props);
          case "definitive":
            return this.computeThreeLastMonthsAverage(props);
          case "temporary":
            return new ReferenceSalaryLegal().computeReferenceSalary(props);
        }
    }
  }

  private computeReferenceSalaryDependsOnVariable({
    salaires,
    hasVariablePay,
  }: ReferenceSalaryProps<SupportedCc.IDCC0016>): number {
    const rankedSalaries = rankByMonthArrayDescFrench(salaires);
    if (hasVariablePay) {
      const salaries = rankedSalaries.map((a) => a.value).filter(nonNullable);

      return sum(salaries) / salaires.length;
    } else {
      return rankedSalaries[0]?.value ?? 0;
    }
  }

  private computeThreeLastMonthsAverage({
    salaires,
  }: ReferenceSalaryProps<SupportedCc.IDCC0016>): number {
    const rankedSalaries = rankByMonthArrayDescFrench(salaires);
    const lastThreeSalaries = rankedSalaries
      .slice(0, 3)
      .map((a) => a.value)
      .filter(nonNullable);

    return sum(lastThreeSalaries) / lastThreeSalaries.length;
  }

  private computeThreeLastMonthsAverageWithPrimes({
    salaires,
  }: ReferenceSalaryProps<SupportedCc.IDCC0016>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const primeValues = rankedSalaires.map((v) => v.prime).filter(nonNullable);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    return (
      sum(primeValues) / 12 +
      (sum(salaryValues.slice(0, 3)) - sum(primeValues)) / 3
    );
  }
}
