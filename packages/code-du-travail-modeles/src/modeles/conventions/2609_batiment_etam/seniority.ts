import { LEGAL_MOTIFS } from "../../base";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { SeniorityDefault } from "../../common/seniority";
import { MotifKeys } from "../../common/motif-keys";

const MOTIFS_2609 = LEGAL_MOTIFS.map((item) => {
  if (item.key === MotifKeys.maladieNonPro) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});

export class Seniority2609 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC2609> {
  getMotifs(): Motif[] {
    return MOTIFS_2609;
  }
}
