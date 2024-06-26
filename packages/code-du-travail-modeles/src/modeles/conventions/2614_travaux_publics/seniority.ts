import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCc } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_2614: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (
    item.key === MotifKeys.maladieNonPro ||
    item.key === MotifKeys.accidentTrajet
  ) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});

export class Seniority2614 extends SeniorityDefault<SupportedCc.IDCC2614> {
  getMotifs(): Motif[] {
    return MOTIFS_2614;
  }
}
