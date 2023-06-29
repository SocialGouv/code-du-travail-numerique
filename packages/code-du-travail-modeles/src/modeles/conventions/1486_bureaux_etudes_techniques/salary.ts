import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export enum TypeLicenciement1486 {
  autre = "Non",
  refus = "Oui",
}

export enum CatPro1486 {
  etam = "ETAM",
  ingeCadre = "Ingénieurs et cadres",
  chargeEnquete = "Chargés d'enquête intermittents",
}

export type CC1486ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  typeLicenciement: TypeLicenciement1486;
  catPro: CatPro1486;
};

export class ReferenceSalary1486
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1486>
{
  /**
   * Règle :
   * ETAM, Ingénieurs et Cadres - Autres licenciements :
   * - 1/12*S
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   *
   * Chargés d'enquête intermittent - Autres licenciements :
   * - 2/12*S
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   *
   * Licenciement en raison d'un refus de respecter une clause de mobilité  <=> renvoie au légal
   *
   **/
  computeReferenceSalary({
    salaires,
    typeLicenciement,
    catPro,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1486>): number {
    if (typeLicenciement === TypeLicenciement1486.refus)
      return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });

    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    const moyenneSalaires = sum(salaryValues) / rankedSalaires.length;

    if (catPro === CatPro1486.chargeEnquete)
      return isNaN(moyenneSalaires) ? 0 : moyenneSalaires * 2;

    return isNaN(moyenneSalaires) ? 0 : moyenneSalaires;
  }
}
