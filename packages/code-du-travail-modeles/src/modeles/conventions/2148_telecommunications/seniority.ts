import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Motif,
  SeniorityProps,
  SeniorityResult,
  SupportedCc,
} from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority2148 extends SeniorityDefault<SupportedCc.IDCC2148> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCc.IDCC2148>): SeniorityResult {
    const result = this.compute(dateEntree, dateSortie, absencePeriods);
    return {
      ...result,
      value: result.value < 1 ? result.value : Math.trunc(result.value),
    };
  }

  getMotifs(): Motif[] {
    return LEGAL_MOTIFS;
  }
}
