import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCc } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

export class Seniority0292 extends SeniorityDefault<SupportedCc.IDCC0292> {
  getMotifs(): Motif[] {
    return MOTIFS_0292;
  }
}

const MOTIFS_0292 = LEGAL_MOTIFS.map((item) => {
  if (
    item.key === MotifKeys.maladieNonPro ||
    item.key === MotifKeys.accidentTrajet ||
    item.key === MotifKeys.congesParentalEducation
  ) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});
