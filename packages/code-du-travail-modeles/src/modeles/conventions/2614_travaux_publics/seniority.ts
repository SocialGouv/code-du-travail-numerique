import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_2614: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});

export class Seniority2614 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC2614> {
  getMotifs(): Motif[] {
    return MOTIFS_2614;
  }
}
