import { LEGAL_MOTIFS } from "../../base";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { SeniorityDefault } from "../../common/seniority";
import { MotifKeys } from "../../common/motif-keys";

const MOTIFS_2511: Motif[] = LEGAL_MOTIFS.map((item) => {
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

export class Seniority2511 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC2511> {
  getMotifs(): Motif[] {
    return MOTIFS_2511;
  }
}
