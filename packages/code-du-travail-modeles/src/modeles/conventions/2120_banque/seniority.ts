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
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
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
    const semestersBefore2002 = Math.max(
      Math.floor(differenceInMonths(new Date(2002, 0, 1), dEntree) / 6),
      0
    );
    const semestersAfter2002 = Math.max(
      Math.floor(differenceInMonths(dSortie, new Date(2002, 0, 1)) / 6),
      0
    );
    return {
      extraInfos: {
        "contrat salarié . convention collective . banque . semestres complets après 2002":
          semestersAfter2002,
        "contrat salarié . convention collective . banque . semestres complets avant 2002":
          semestersBefore2002,
        ...this.getExtraInfoAbsence(absences),
      },
      value: result.value,
    };
  }

  private getExtraInfoAbsence(
    absencePeriods: Absence[]
  ): Record<string, string> {
    if (
      absencePeriods.some(
        (absence) =>
          absence.motif.key === MotifKeys.maladieNonPro &&
          absence.durationInMonth &&
          absence.durationInMonth > 0
      )
    ) {
      return {
        "contrat salarié . convention collective . banque . maladie non pro":
          "oui",
      };
    }
    return {};
  }
}
