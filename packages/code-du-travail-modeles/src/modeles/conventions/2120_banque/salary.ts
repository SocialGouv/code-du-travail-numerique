import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import {
  QuestionOuiNonWithQuote,
  rankByMonthArrayDescFrench,
} from "../../common";

export type CC2120ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salariesVariablePart: number;
  isLicenciementEco: QuestionOuiNonWithQuote;
  isLicenciementDisciplinaire: QuestionOuiNonWithQuote;
};

export class ReferenceSalary2120
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC2120>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2120> {
    const isLicenciementInaptitude = args.licenciementInaptitude === "oui";
    const isLicenciementDisciplinaire = args[
      "contrat salarié . convention collective . banque . licenciement disciplinaire"
    ] as QuestionOuiNonWithQuote;
    const isLicenciementEco = args[
      "contrat salarié . convention collective . banque . licenciement économique"
    ] as QuestionOuiNonWithQuote;
    return {
      isLicenciementDisciplinaire: isLicenciementInaptitude
        ? QuestionOuiNonWithQuote.non
        : isLicenciementDisciplinaire,
      isLicenciementEco: isLicenciementInaptitude
        ? QuestionOuiNonWithQuote.non
        : isLicenciementEco,
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
      salariesVariablePart: args.salariesVariablePart
        ? parseInt(args.salariesVariablePart)
        : 0,
    };
  }

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
    if (isLicenciementEco === "'Oui'") {
      return salariesWithoutPrimes / rankedSalaires.length;
    }
    if (isLicenciementDisciplinaire === "'Non'") {
      return salariesWithoutPrimes / (rankedSalaires.length + 1);
    }
    return new ReferenceSalaryLegal().computeReferenceSalary({
      salaires,
    });
  }
}
