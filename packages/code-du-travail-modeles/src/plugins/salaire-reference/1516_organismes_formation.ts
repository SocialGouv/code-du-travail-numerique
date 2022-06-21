import { rankByMonthArrayDescFrench, sum } from "../../utils";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SupportedCcIndemniteLicenciement,
} from "./types";

export class ReferenceSalary1516
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1516>
{
  /**
   * Règle :
   * - soit 1/12*S
   *  S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * - soit S + (P/12)
   * S : salaire le plus élevé perçu au cours des 3 derniers mois de travail (brut)
   * P : prime(s) ou gratification(s) de caractère annuel ou exceptionnel versée au salarié pendant cette période prise en compte prorata temporis
   **/
  computeReferenceSalary({
    hasSameSalaire,
    salaires,
    salaire,
    primesPendantPreavis,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1516>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    );
    const salaryValues = rankedSalaires.map((a) => a.value);

    if (!salaire) {
      salaire = 0;
    }

    const moyenneSalaires = hasSameSalaire
      ? salaire
      : sum(salaryValues) / rankedSalaires.length;

    const totalSalaryValues = [
      ...rankedSalairesPendantPreavis.map((a) => a.value),
      ...salaryValues,
    ];

    const meilleurSalaireDes3DerniersMois = hasSameSalaire
      ? salaire
      : Math.max(...totalSalaryValues.slice(0, 3));

    const formuleCc =
      meilleurSalaireDes3DerniersMois + sum(primesPendantPreavis) / 12;

    return Math.max(moyenneSalaires, formuleCc);
  }
}
