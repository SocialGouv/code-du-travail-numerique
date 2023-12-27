import { LEGAL_MOTIFS } from "../../base/seniority";
import type {
  Motif,
  RequiredSeniorityResult,
  SeniorityRequiredProps,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority1517 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC1517> {
  computeRequiredSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityRequiredProps<SupportedCcIndemniteLicenciement.default>): RequiredSeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  getMotifs(): Motif[] {
    return LEGAL_MOTIFS;
  }
}
