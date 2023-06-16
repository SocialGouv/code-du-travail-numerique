import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  QuestionOuiNon,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { rankByMonthArrayDescFrench } from "../../common";

export type CC2120ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  isLicenciementEco: QuestionOuiNon;
  isLicenciementDisciplinaire: QuestionOuiNon;
};

export class ReferenceSalary2120
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC2120>
{
  computeReferenceSalary({
    salaires,
    isLicenciementEco,
    isLicenciementDisciplinaire,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2120>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires).slice(0, 12);
    const totalSalaryValues = rankedSalaires.reduce(
      (sum, current) => sum + (current.value ?? 0),
      0
    );

    console.log(totalSalaryValues);

    if (isLicenciementEco === "Oui") {
      const averageSalary = totalSalaryValues / rankedSalaires.length;
      return isNaN(averageSalary) ? 0 : averageSalary;
    }
    if (isLicenciementDisciplinaire === "Non") {
      return totalSalaryValues / (rankedSalaires.length + 1);
    }
    return new ReferenceSalaryLegal().computeReferenceSalary({
      salaires,
    });
  }
}
