import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCc } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_1505: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.congesParentalEducation) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});

export class Seniority1505 extends SeniorityDefault<SupportedCc.IDCC1505> {
  getMotifs(): Motif[] {
    return MOTIFS_1505;
  }
}
