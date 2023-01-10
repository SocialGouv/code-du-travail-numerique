import { LEGAL_MOTIFS } from "../../base";
import type {
  Motif,
  RequiredSeniorityResult,
  SeniorityRequiredProps,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { SeniorityDefault } from "../../common";

export class Seniority1517 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC1517> {
  computeRequiredSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }

  getMotifs(): Motif[] {
    return LEGAL_MOTIFS;
  }
}
