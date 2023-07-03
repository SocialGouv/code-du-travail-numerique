import { addDays, differenceInMonths } from "date-fns";

import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Absence,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { parseDate } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_2120 = LEGAL_MOTIFS.map((item) => {
  return {
    ...item,
    startAt: () => true,
  };
});

export class Seniority2120 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC2120> {
  getMotifs(): Motif[] {
    return MOTIFS_2120;
  }

  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC1486>): SeniorityResult {
    return this.computeChild(dateEntree, dateSortie, absencePeriods);
  }

  private computeChild(
    from: string,
    to: string,
    absences: Absence[]
  ): SeniorityResult {
    const result = super.computeSeniority({
      absencePeriods: absences,
      dateEntree: from,
      dateSortie: to,
    });
    const dEntree = parseDate(from);
    const dSortie = addDays(parseDate(to), 1);
    const totalAbsenceInMonthsBefore2002 = absences
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (!m || !item.durationInMonth) {
          return total;
        }
        const d = addDays(parseDate(item.startedAt ?? ""), 1);
        if (d.getFullYear() >= 2002) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0);
    const totalAbsenceInMonthsAfter2002 = absences
      .filter((period) => Boolean(period.durationInMonth))
      .reduce((total, item) => {
        const m = this.getMotifs().find(
          (motif) => motif.key === item.motif.key
        );
        if (!m || !item.durationInMonth) {
          return total;
        }
        const d = addDays(parseDate(item.startedAt ?? ""), 1);
        if (d.getFullYear() < 2002) {
          return total;
        }
        return total + item.durationInMonth * m.value;
      }, 0);

    const minDate =
      new Date(2002, 0, 1).getTime() < dEntree.getTime()
        ? dEntree
        : new Date(2002, 0, 1);
    const semestersBefore2002WithAbsence = Math.max(
      Math.floor(
        (differenceInMonths(minDate, dEntree) -
          totalAbsenceInMonthsBefore2002) /
          6
      ),
      0
    );
    const semestersAfter2002WithAbsence = Math.max(
      Math.floor(
        (differenceInMonths(dSortie, minDate) - totalAbsenceInMonthsAfter2002) /
          6
      ),
      0
    );
    return {
      extraInfos: {
        "contrat salarié . convention collective . banque . semestres complets après 2002":
          semestersAfter2002WithAbsence,
        "contrat salarié . convention collective . banque . semestres complets avant 2002":
          semestersBefore2002WithAbsence,
        ...this.getExtraInfoAbsence(absences),
      },
      value: result.value,
    };
  }

  private getExtraInfoAbsence(
    absencePeriods: Absence[]
  ): Record<string, string> {
    let defaultObject = {};
    if (
      absencePeriods.some(
        (absence) =>
          absence.motif.key === MotifKeys.maladieNonPro &&
          absence.durationInMonth &&
          absence.durationInMonth > 0
      )
    ) {
      defaultObject = {
        ...defaultObject,
        ...{
          "contrat salarié . convention collective . banque . maladie non pro":
            "oui",
        },
      };
    }
    if (
      absencePeriods.some(
        (absence) =>
          absence.motif.key === MotifKeys.accidentTrajet &&
          absence.durationInMonth &&
          absence.durationInMonth > 0
      )
    ) {
      defaultObject = {
        ...defaultObject,
        ...{
          "contrat salarié . convention collective . banque . accident trajet":
            "oui",
        },
      };
    }
    return defaultObject;
  }
}
