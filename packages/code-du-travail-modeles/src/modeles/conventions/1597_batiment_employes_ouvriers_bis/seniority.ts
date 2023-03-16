import { LEGAL_MOTIFS } from "../../base/seniority";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { MotifKeys } from "../../common/motif-keys";
import { SeniorityDefault } from "../../common/seniority";

const MOTIFS_1597 = LEGAL_MOTIFS.map((item) => {
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

export class Seniority1597 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC1597> {
  getMotifs(): Motif[] {
    return MOTIFS_1597;
  }
}
