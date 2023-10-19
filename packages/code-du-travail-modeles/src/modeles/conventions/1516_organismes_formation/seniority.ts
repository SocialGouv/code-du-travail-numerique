import { addDays, differenceInMonths } from "date-fns";

import { LEGAL_MOTIFS } from "../../base";
import type {
  Absence,
  DefaultSeniorityRequiredProps,
  ISeniority,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { MotifKeys, parseDate } from "../../common";

export class Seniority1516
  implements ISeniority<SupportedCcIndemniteLicenciement.IDCC1516>
{
  getMotifs(): Motif[] {
    return LEGAL_MOTIFS;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1516>): SeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: DefaultSeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  protected compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
    const MAXIMUM_CONGES_PARENTAL_EN_MOIS = 36;
    const totalAbsenceSansCongesParental = absences
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (
          !m ||
          !item.durationInMonth ||
          m.key === MotifKeys.congesParentalEducation
        ) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0);
    const totalAbsenceAvecCongesParentalSansCoeff = absences
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item: any) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (
          !m ||
          !item.durationInMonth ||
          m.key !== MotifKeys.congesParentalEducation
        ) {
          return total;
        }
        return total + parseInt(item.durationInMonth);
      }, 0);
    const congesMotif = this.getMotifs().find(
      (motif) => motif.key === MotifKeys.congesParentalEducation
    );
    if (!congesMotif) {
      throw new Error("Motif congé parental non trouvé");
    }

    const totalCongesParental =
      totalAbsenceAvecCongesParentalSansCoeff >= MAXIMUM_CONGES_PARENTAL_EN_MOIS
        ? (totalAbsenceAvecCongesParentalSansCoeff -
            MAXIMUM_CONGES_PARENTAL_EN_MOIS) *
          congesMotif.value
        : 0;
    const totalAbsence = totalCongesParental + totalAbsenceSansCongesParental;
    return {
      value: (differenceInMonths(dSortie, dEntree) - totalAbsence) / 12,
    };
  }
}
