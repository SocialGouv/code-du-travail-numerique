import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Motif,
  RequiredSeniorityResult,
  SeniorityRequiredProps,
  SupportedCc,
} from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority1606 extends SeniorityDefault<SupportedCc.IDCC1606> {
  computeRequiredSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityRequiredProps<SupportedCc.default>): RequiredSeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  getMotifs(): Motif[] {
    return LEGAL_MOTIFS;
  }
}
