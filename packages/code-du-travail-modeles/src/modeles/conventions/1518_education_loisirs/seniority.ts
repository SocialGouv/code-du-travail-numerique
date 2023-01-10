import { LEGAL_MOTIFS } from "../../base";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { SeniorityDefault } from "../../common/seniority";
import { MotifKeys } from "../../common/motif-keys";

const MOTIFS_1518: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesParentalEducation) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});

export class Seniority1518 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC1518> {
  getMotifs(): Motif[] {
    return MOTIFS_1518;
  }
}
