import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCc } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_1702: Motif[] = LEGAL_MOTIFS.map((item) => {
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

export class Seniority1702 extends SeniorityDefault<SupportedCc.IDCC1702> {
  getMotifs(): Motif[] {
    return MOTIFS_1702;
  }
}
