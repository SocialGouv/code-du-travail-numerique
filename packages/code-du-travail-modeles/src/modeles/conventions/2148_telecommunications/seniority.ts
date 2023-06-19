import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Motif,
  RequiredSeniorityResult,
  SeniorityProps,
  SeniorityRequiredProps,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority2148 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC2148> {
  computeSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityProps<SupportedCcIndemniteLicenciement.IDCC2148>): SeniorityResult {
    const result = this.compute(dateEntree, dateSortie, absencePeriods);
    return {
      ...result,
      value: Math.trunc(result.value),
    };
  }

  computeRequiredSeniority({
    dateEntree,
    dateNotification,
    absencePeriods = [],
  }: SeniorityRequiredProps): RequiredSeniorityResult {
    const result = this.compute(dateEntree, dateNotification, absencePeriods);
    return {
      ...result,
      value: Math.trunc(result.value),
    };
  }

  getMotifs(): Motif[] {
    return LEGAL_MOTIFS;
  }
}
