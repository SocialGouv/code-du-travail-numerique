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
  salariesVariablePart: number;
  isLicenciementEco: QuestionOuiNon;
  isLicenciementDisciplinaire: QuestionOuiNon;
};

export class ReferenceSalary2120
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC2120>
{
  computeReferenceSalary({
    salaires,
    salariesVariablePart,
    isLicenciementEco,
    isLicenciementDisciplinaire,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2120>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires).slice(0, 12);
    const totalSalaryValues = rankedSalaires.reduce(
      (sum, current) => sum + (current.value ?? 0),
      0
    );
    const salariesWithoutPrimes = Math.max(
      totalSalaryValues - salariesVariablePart,
      0
    );
    if (isLicenciementEco === "Oui") {
      return salariesWithoutPrimes / rankedSalaires.length;
    }
    if (isLicenciementDisciplinaire === "Non") {
      return salariesWithoutPrimes / (rankedSalaires.length + 1);
    }
    return new ReferenceSalaryLegal().computeReferenceSalary({
      salaires,
    });
  }
}
