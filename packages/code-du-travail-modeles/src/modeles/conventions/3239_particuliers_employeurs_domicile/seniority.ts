import { addDays, differenceInDays } from "date-fns";

import type {
  Absence,
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { parseDate } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_3239: Motif[] = [
  {
    key: MotifKeys.maladieNonPro,
    label: "Absence pour maladie non professionnelle",
    value: 1,
  },
  {
    key: MotifKeys.congesParentalEducation,
    label: "Congé parental d'éducation",
    value: 0.5,
  },
  {
    key: MotifKeys.convenancePro,
    label: "Congé pour convenance personnelle",
    value: 1,
  },
  {
    key: MotifKeys.absenceInjustifiée,
    label: "Absence injustifiée du salarié",
    value: 1,
  },
  {
    key: MotifKeys.congeEnfantMalade,
    label: "Congé pour enfant malade",
    value: 1,
  },
];

const DAYS_IN_MONTH = 30.4375;

export class Seniority3239 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC3239> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC3239>): SeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateNotification, absencePeriods);
  }

  getMotifs(): Motif[] {
    return MOTIFS_3239;
  }

  protected compute(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
    const totalAbsence = absences
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (!m || !item.durationInMonth) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0);
    const totalAbsenceInDays = totalAbsence * DAYS_IN_MONTH;
    const totalDays = differenceInDays(dSortie, dEntree);
    const seniorityInDays = totalDays - totalAbsenceInDays;
    const seniorityInMonths = seniorityInDays / DAYS_IN_MONTH / 12;
    return {
      value: seniorityInMonths,
    };
  }
}
