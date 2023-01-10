import { LEGAL_MOTIFS } from "../../base";
import type { Motif, SupportedCcIndemniteLicenciement } from "../../common";
import { SeniorityDefault } from "../../common";

const MOTIFS_3043: Motif[] = LEGAL_MOTIFS.map((item) => ({
  ...item,
  value: 0,
}));

export class Seniority3043 extends SeniorityDefault<SupportedCcIndemniteLicenciement.IDCC3043> {
  getMotifs(): Motif[] {
    return MOTIFS_3043;
  }
}
