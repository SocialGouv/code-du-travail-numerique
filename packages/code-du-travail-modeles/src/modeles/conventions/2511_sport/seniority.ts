import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Absence,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCc,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority2511 extends SeniorityDefault<SupportedCc.IDCC2511> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCc.IDCC2511>): SeniorityResult {
    return {
      ...this.compute(dateEntree, dateSortie, absencePeriods),
      extraInfos: this.getExtraInfoAbsence(absencePeriods),
    };
  }

  getMotifs(): Motif[] {
    return MOTIFS_2511;
  }

  private getExtraInfoAbsence(
    absencePeriods: Absence[]
  ): Record<string, string> {
    if (
      absencePeriods.some(
        (absence) => absence.motif.key === MotifKeys.maladieNonPro
      )
    ) {
      return {
        "contrat salarié . convention collective . sport . congé maladie non professionnelle":
          "oui",
      };
    }
    return {};
  }
}

const MOTIFS_2511: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.accidentTrajet) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
