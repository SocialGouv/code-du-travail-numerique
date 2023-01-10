import { LEGAL_MOTIFS } from "../../base";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { SeniorityDefault } from "../../common";
import { MotifKeys } from "../../common/motif-keys";

const MOTIFS_3239: Motif[] = LEGAL_MOTIFS.map((item) => {
  if (
    item.key === MotifKeys.accidentTrajet ||
    item.key === MotifKeys.congesPaternite
  ) {
    return {
      ...item,
      value: 0,
    };
  }
  return item;
});

export class Seniority3239 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC3239> {
  getMotifs(): Motif[] {
    return MOTIFS_3239;
  }
}
