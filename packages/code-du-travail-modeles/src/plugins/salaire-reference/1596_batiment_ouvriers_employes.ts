import { sum } from "../../utils";
import type { ISalaireReference, LegalReferenceSalaryProps } from "./types";

export class SalaireReference1596
  implements ISalaireReference<LegalReferenceSalaryProps>
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
    primes,
  }: LegalReferenceSalaryProps): number {
    const salaryValues = salaires.map((a) => a.value);

    if (!salaire) {
      salaire = 0;
    }

    const moyenneSalaires = hasSameSalaire
      ? salaire
      : sum(salaryValues) / salaires.length;

    const meilleurSalaireDes3DerniersMois = hasSameSalaire
      ? salaire
      : Math.max(...salaryValues.slice(0, 3));

    const formuleCc = meilleurSalaireDes3DerniersMois + sum(primes) / 12;

    return Math.max(moyenneSalaires, formuleCc);
  }
}
