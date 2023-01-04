import { SeniorityLegal } from "../../base/seniority";
import type {
  RequiredSeniorityResult,
  SeniorityRequiredProps,
} from "../../common";

export class Seniority1517 extends SeniorityLegal {
  computeRequiredSeniority({
    dateEntree,
    dateSortie,
    absencePeriods = [],
  }: SeniorityRequiredProps): RequiredSeniorityResult {
    return this.compute(dateEntree, dateSortie, absencePeriods);
  }
}
