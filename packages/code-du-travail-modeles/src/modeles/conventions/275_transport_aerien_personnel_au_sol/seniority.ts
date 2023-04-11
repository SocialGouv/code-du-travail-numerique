import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Absence,
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority275 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC275> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC275>): SeniorityResult {
    return {
      ...this.compute(dateEntree, dateSortie, absencePeriods),
      extraInfos: this.getExtraInfoAbsence(absencePeriods),
    };
  }

  getMotifs(): Motif[] {
    return MOTIFS_275;
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
        "contrat salarié . convention collective . transport aérien personnel au sol . congé maladie non professionnelle":
          "oui",
      };
    }
    return {};
  }
}

const MOTIFS_275: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesParentalEducation) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
