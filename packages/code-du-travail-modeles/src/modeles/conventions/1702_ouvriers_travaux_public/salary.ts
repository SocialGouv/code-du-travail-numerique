import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export class ReferenceSalary1702
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1702>
{
  /**
   * Règle :
   * Pour la catégorie pro :
   * - soit (S + ((P/12)*3))/3
   *   S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *   P : prime(s) annuelle(s) versée(s) pendant cette période (prise en compte prorata temporis)
   *
   * - soit 1/12*S
   *   S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)"
   **/
  computeReferenceSalary({
    salaires = [],
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1702>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);

    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const moyenneSalaires = sum(salaryValues) / rankedSalaires.length;

    const dernier3Mois = rankedSalaires.slice(0, 3);
    const salaryValues3DerniersMois = dernier3Mois
      .map((a) => a.value)
      .filter(nonNullable);

    const meilleurSalaireDes3DerniersMois: number = Math.max(
      ...salaryValues3DerniersMois
    );

    const primes = dernier3Mois.map((v) => v.prime).filter(nonNullable);

    const formuleCc =
      (meilleurSalaireDes3DerniersMois + (sum(primes) / 12) * 3) / 3;

    return Math.max(moyenneSalaires, formuleCc);
  }
}
